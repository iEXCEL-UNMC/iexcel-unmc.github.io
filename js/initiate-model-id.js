var version = "1.12.0",
      uid = "c830d8a0f15d4ede82f455305f84ed11",
      urlParams = new URLSearchParams(window.location.search),
      autoSpin = 0;
    urlParams.has("autospin") && (autoSpin = urlParams.get("autospin")), urlParams.has("id") && (uid = urlParams.get("id"));
    var iframe = document.getElementById("api-frame"),
      client = new window.Sketchfab(version, iframe),
      treeText = "",
      error = function() {
        console.error("Sketchfab API error")
      },
      idxNodes = 0,
      myNodesByNameFromMap = {},
      officialNodes = [],
      objectID = -1,
      success = function(e) {
        e.start(function() {
          e.addEventListener("viewerready", function() {
            e.getNodeMap(function(n, t) {
              if (!n) {
                for (var a in t) {
                  var r = t[a],
                    o = r.name;
                  o || (o = "noname_" + idxNodes++), myNodesByNameFromMap[o] = r
                }
                rootNodeTree = myNodesByNameFromMap.RootNode, recurse(rootNodeTree, rootNodeTree.children.length, 0), generateTree();
                for (var i = document.getElementsByClassName("Hide"), d = 0; d < i.length; d++) i[d].addEventListener("click", function() {
                  this.style.backgroundColor = "red";
                  var n = document.getElementById(this.value).getElementsByClassName("Hide");
                  console.log(" Child Buttons: " + n.length), 0 == n.length && e.hide(this.value);
                  for (var t = 0; t < n.length; t++) hideBTN = document.getElementById(n[t].id), hideBTN.style.backgroundColor = "red", e.hide(hideBTN.value)
                });
                var l = document.getElementsByClassName("Show");
                for (d = 0; d < l.length; d++) l[d].addEventListener("click", function() {
                  e.show(this.value), console.log(this.value);
                  var n = document.getElementById(this.id + "_" + this.name + "Hide");
                  n.style.backgroundColor = "green";
                  for (var t = document.getElementById(this.value).getElementsByClassName("Show"), a = 0; a < t.length; a++) e.show(t[a].value), (n = document.getElementById(t[a].id + "_Hide")).style.backgroundColor = "green"
                })
              }
            })
          })
        })
      };

    function initGui() {
      document.getElementById("navTree").innerHTML = '<button id="screenshot"></button>'
    }

    function generateTree() {
      console.log("Total Node Count: " + officialNodes.length);
      var e = unflatten(officialNodes);
      document.getElementById("navTree").appendChild(to_ul(e, "myUL"));
      var n, t = document.getElementsByClassName("caret");
      for (n = 0; n < t.length; n++) t[n].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active"), this.classList.toggle("caret-down")
      })
    }

    function unflatten(e) {
      for (var n, t, a = [], r = {}, o = 0, i = e.length; o < i; o++) r[(n = e[o]).instanceID] = n, r[n.instanceID].children = [];
      for (var d in r) r.hasOwnProperty(d) && ((t = r[d]).parentID ? r[t.parentID].children.push(t) : a.push(t));
      return a
    }

    function to_ul(e, n = "", t = "") {
      var a = document.createElement("ul");
      "" != n && (a.id = n), "" != t && (a.className = t);
      for (var r = 0, o = e.length; r < o; r++) {
        var i = e[r],
          d = document.createElement("li"),
          l = i.name.replace(/_/g, " ");
        l.length > 25 && (l = l.substring(0, 25), l += "...");
        var c, s = document.createTextNode(l);
        if (i.isParent)(c = document.createElement("span")).className = "caret", c.appendChild(s), d.appendChild(c), d.appendChild(createButton("Hide", i.instanceID, i.name)), d.appendChild(createButton("Show", i.instanceID, i.name));
        else(c = document.createElement("span")).className = "caret_child", c.appendChild(s), d.appendChild(c), d.appendChild(createButton("Hide", i.instanceID, i.name)), d.appendChild(createButton("Show", i.instanceID, i.name));
        i.children && d.appendChild(to_ul(i.children, i.instanceID, "nested")), a.appendChild(d)
      }
      return console.log(a), a
    }

    function createButton(e, n, t) {
      var a = document.createElement("button");
      a.type = "button", a.className = e, "Hide" == e ? (a.id = n + "_" + t + "_" + e, a.style.backgroundColor = "green") : a.id = n + "_" + t, a.value = n;
      var r = document.createTextNode(e);
      return a.appendChild(r), a
    }

    function recurse(e, n, t) {
      if (void 0 !== e)
        for (var a = 0; a < n; a++) {
          var r = new Object;
          r.name = e.children[a].name, r.type = e.children[a].type, r.instanceID = e.children[a].instanceID, r.isParent = !1, r.parentID = t, "MatrixTransform" == r.type && (r.isParent = isParent(e.children[a].children), console.log("   " + r.name + "(Node Type:" + r.type + ")(Instance ID: " + r.instanceID + ")(Is Parent: " + r.isParent + ")(Parent ID: " + r.parentID + ") Child Count :" + e.children[a].children.length), officialNodes.push(r), recurse(e.children[a], e.children[a].children.length, e.children[a].instanceID))
        }
    }

    function isParent(e) {
      for (var n = !1, t = 0; t < e.length; t++) {
        if ("MatrixTransform" == e[t].type) {
          n = !0, console.log("PARENT NODE DETECTED");
          break
        }
        n = !1
      }
      return n
    }
    api.setBackground({
      transparent: 1
    }, function() {
      window.console.log("Background changed")
    });