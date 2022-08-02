function actionSkfb() {
    // initialize
    if (!window.Sketchfab) {
      console.log('no Sketchfab library');
    }
    var client = new window.Sketchfab(version, iframe);
    var error = function error() {
      console.error('Sketchfab API error');
    };
    var success = function success(api) {
      api.start(function() {});
      api.addEventListener('viewerready', function() {
        api.getAnnotationList(function(err, annotations) {
          if (!err) {
            console.log(annotations);
          }
          var textDiv = document.getElementById('annotations-sync');

          
          //Dheeraj's Code//


          function setToNormal(arrMat) {
            for (var i = 0; i < arrMat.length; i++) {
              var m = arrMat[i];
              m.channels.EmitColor.enable = 0;
              api.setMaterial(m);
            }
          }

          function highlightMat(m) {
            //var m = myMaterials[i];
            m.channels.EmitColor.enable = 1;
            m.channels.EmitColor.factor = 1;
            m.channels.EmitColor.color = [0.439, 0.960, 0.423];
            api.setMaterial(m);
          }


  

          /*
          document.getElementById('highlightToggleCheckbox').addEventListener('click', function() {

          var matsToIsolate = [
              myMaterialsByName["earRetops_EarRetops_ear2scaledToDK_export1_lambert3"]
          ];

          var checkbox = document.getElementById('highlightToggleCheckbox');
          if (checkbox.checked) {
              
              for(var i = 0; i < matsToIsolate.length; i++)
              {
                  isolateMat(matsToIsolate[i]);
              }

          }

          });
          */

          /*
           api.addEventListener('click', function (info) {
              if (info && info.material) {
                isolateMat(info.material);
                textDiv.innerHTML = info.material.name;
                api.highlightMaterial(info.material);
              }
              else{
              
                  unIsolate();
              }
            });
            */
          


          ///////////////////MATERIAL HIGHLIGHT///////////////////////
          var myMaterials;
          var myMaterialsByName = {};
          
          api.getMaterialList(function(err, materials) {
            if (!err) {
              myMaterials = materials;
              for (var materialID in materials) {
                var material = materials[materialID];
                var name = material.name;
                if (!name) name = "noname_" + idxNodes++;
                myMaterialsByName[name] = material;
              }
            }
          });
          api.setHighlightOptions({
            outlineWidth: 5,
            outlineColor: [0.09, 0.76, 1],
            outlineDuration: 2,
          });
          /*
          document.getElementById('a5').addEventListener('click', function() {
            api.highlightMaterial(myMaterialsByName["skin_mat"]);
            setToNormal();
          });
    */
              

              //sets all materials to lower Opacity
              //then sets the input material to full opacity
                function isolateMat(m) {
              
              for(var i = 0; i < myMaterials.length; i++)
              {
                  myMaterials[i].channels.Opacity = {
                      enable: true,
                      factor: 0.1 };
                       api.setMaterial(myMaterials[i]);
                  }


              m.channels.Opacity = {
            enable: true,
            factor: 1 };
            api.setMaterial(m);
            }

          function hideMat(m) {
              
              for(var i = 0; i < myMaterials.length; i++)
              {
                  myMaterials[i].channels.Opacity = {
                      enable: true,
                      factor: 0 };
                       api.setMaterial(m);
                  }


            }


            //sets all the materials to full opacity
            function unIsolate(){


              for(var i = 0; i < myMaterials.length; i++)
              {
                  myMaterials[i].channels.Opacity = {
                      enable: true,
                      factor: 1 };
                       api.setMaterial(myMaterials[i]);
                  }
              
            }


          ////////////////////////////////////////////////
          //api.hide(myNodesByNameFromMap2["midsaggital_cutface"]);
          var myNodesByNameFromMap2 = {};

          api.getNodeMap(function(err, nodes) {
            if (!err) {
              for (var instanceID in nodes) {
                var node = nodes[instanceID];
                var name = node.name;
                if (!name) name = "noname_" + idxNodes++;
                myNodesByNameFromMap2[name] = node.instanceID;

              }
            }
          });




          /////////////////////////////////////////NK CELL/////////////////////////////////////////
          document.getElementById('nkCellCheckbox').addEventListener('click', function() {
            var nkCellToHide = [
            
            myNodesByNameFromMap2["NK_Cell_LP"]

              
            
            ];
            var checkbox = document.getElementById('nkCellCheckbox');
            if (checkbox.checked != true) {
              for (var i = 0; i < nkCellToHide.length; i++) {
                api.hide(nkCellToHide[i]);
              }
            } else {
              for (var i = 0; i < nkCellToHide.length; i++) {
                api.show(nkCellToHide[i]);
              }
            }
          });
          ////////////////////////////////////NUCLEUS//////////////////////////////////
          document.getElementById('nucleusCheckbox').addEventListener('click', function() {
            var nucleusToHide =[ myNodesByNameFromMap2["NK_Cell_nucleus"]];  
            
            var checkbox = document.getElementById('nucleusCheckbox');
            if (checkbox.checked != true) {
              for (var i = 0; i < nucleusToHide.length; i++) {
                api.hide(nucleusToHide[i]);
              }
            } else {
              for (var i = 0; i < nucleusToHide.length; i++) {
                api.show(nucleusToHide[i]);
              }
            }
          });
          /////////////////////////////////////////COCHLEA/////////////////////////////////////////
          document.getElementById('azurophilicCheckbox').addEventListener('click', function() {
            var azurophilicToHide = [
              myNodesByNameFromMap2["granules_azurophilic"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_1"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_2"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_3"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_4"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_5"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_6"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_7"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_8"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_9"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_10"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_11"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_12"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_13"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_14"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_15"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_16"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_17"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_18"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_19"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_20"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_21"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_22"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_23"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_24"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_25"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_26"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_27"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_28"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_29"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_30"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_31"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_32"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_33"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_34"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_35"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_36"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_37"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_38"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_39"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_40"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_41"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_42"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_43"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_44"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_45"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_46"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_47"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_48"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_49"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_50"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_51"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_52"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_53"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_54"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_55"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_56"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_57"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_58"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_59"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_60"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_61"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_62"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_63"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_64"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_65"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_66"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_67"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_68"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_69"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_70"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_71"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_72"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_73"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_74"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_75"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_76"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_77"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_78"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_79"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_80"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_81"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_82"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_83"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_84"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_85"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_86"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_87"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_88"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_89"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_90"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_91"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_92"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_93"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_94"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_95"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_96"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_97"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_98"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_99"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_100"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_101"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_102"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_103"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_104"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_105"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_106"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_107"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_108"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_109"],
              myNodesByNameFromMap2["granules_azurophilic_ncl1_110"]

            ];
           

            var checkbox = document.getElementById('azurophilicCheckbox');
            
            if (checkbox.checked != true) {

              hideMat(myMaterialsByName["Granules_baso_sp_mat"]);
              for (var i = 0; i < azurophilicToHide.length; i++) {
                api.hide(azurophilicToHide[i]);
              }
            } else {
                for (var i = 0; i < azurophilicToHide.length; i++) {
                  api.show(azurophilicToHide[i]);
                }
              } 
          });
          /////////////////////////////////////////GRANULES/////////////////////////////////////////
          document.getElementById('granulesCheckbox').addEventListener('click', function() {
            var granulesToHide = [
            
              myNodesByNameFromMap2["granules_largeCytoplasmic_0"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_1"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_2"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_3"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_4"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_5"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_6"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_7"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_8"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_9"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_10"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_11"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_12"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_13"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_14"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_15"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_16"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_17"],
              myNodesByNameFromMap2["granules_largeCytoplasmic_18"]
            
            
            ];

            var checkbox = document.getElementById('granulesCheckbox');

            if (!checkbox.checked) {
              for (var i = 0; i < granulesToHide.length; i++) {
                api.hide(granulesToHide[i]);
              }
            } else {

                for (var i = 0; i < granulesToHide.length; i++) {
                  api.show(granulesToHide[i]);

              } 

              }
          });



          /////////////////////////ANNOTATIONS HIDING////////////////////////////////////////
          /*
          var structures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
          var prominentMuscles = [15, 16, 17, 18, 19, 20, 21, 22, 23];
          var urinaryIncontinence = [24, 25];
          var takeHome = [26, 27, 28, 29, 30, 31];
          document.getElementById('a0').addEventListener('click', function() {
            for (var i = 0; i < annotations.length; i++) {
              api.hideAnnotation(i);
            }
            for (annot in structures) {
              api.showAnnotation(structures[annot] - 1);
            }
          });
          document.getElementById('a1').addEventListener('click', function() {
            for (var i = 0; i < annotations.length; i++) {
              api.hideAnnotation(i);
            }
            for (annot in prominentMuscles) {
              api.showAnnotation(prominentMuscles[annot] - 1);
            }
          });
          document.getElementById('a2').addEventListener('click', function() {
            for (var i = 0; i < annotations.length; i++) {
              api.hideAnnotation(i);
            }
            for (annot in urinaryIncontinence) {
              api.showAnnotation(urinaryIncontinence[annot] - 1);
            }
          });
    */

          document.getElementById('annotationsCheckbox').addEventListener('click', function() {
            var granulesToHide = [
            
              myNodesByNameFromMap2["nucleus_leader"],
              myNodesByNameFromMap2["nucleus_plane"],
              myNodesByNameFromMap2["azu_plane"],
              myNodesByNameFromMap2["azu_leader"],
              myNodesByNameFromMap2["PlaneLabel"],
              myNodesByNameFromMap2["LineLeader"],

            
            
            ];

            var checkbox = document.getElementById('annotationsCheckbox');

            if (!checkbox.checked) {
              for (var i = 0; i < granulesToHide.length; i++) {
                api.hide(granulesToHide[i]);
              }
            } else {

                for (var i = 0; i < granulesToHide.length; i++) {
                  api.show(granulesToHide[i]);

              } 

              }
          });
          /*
          document.getElementById('annotationsCheckbox').addEventListener('click', function() {
            var checkbox = document.getElementById('annotationsCheckbox');
            if (checkbox.checked) {
              for (var i = 0; i < annotations.length; i++) {
                api.showAnnotation(i);
              }
            } else {
              for (var i = 0; i < annotations.length; i++) {
                api.hideAnnotation(i);
              }
            }
          });
          */
          //Dheeraj's Code End//
          api.addEventListener('annotationSelect', function(info) {
            if (info === -1) {
              textDiv.innerHTML = '';
              return;
            }
            var materialHighlight = [
              /*1*/
              myMaterialsByName["Granules_baso_sp_mat"],
              /*2*/
              myMaterialsByName["Granule_sec_mat"],
              /*3*/
              myMaterialsByName["Baso_nucleus_mat"],
              /*4*/
              myMaterialsByName["invis_vaginal_opening_mat"],
              /*5*/
              myMaterialsByName["l_Skenes_gland_mat"],
              /*6*/
              myMaterialsByName["l_vestibular_bulb_mat"],
              /*7*/
              myMaterialsByName["l_deeo_transverse_perineal_muscle_mat"],
              /*8*/
              myMaterialsByName["l_superfical_transverse_perineal_muscle_mat"],
              /*9*/
              myMaterialsByName["pudendalNerve_SG"],
              /*10*/
              myMaterialsByName["perinealNerve_SG"],
              /*11*/
              myMaterialsByName["l_puborectalis_muscle_mat"],
              /*12*/
              myMaterialsByName["l_pubococcygeus_muscle_mat"],
              /*13*/
              myMaterialsByName["l_ileococcygeus_muscle_mat"],
              /*14*/
              myMaterialsByName["l_coccygeus_muscle_mat"],
              /*15*/
              myMaterialsByName["l_tendinous_arch_of_levator_ani"],
              /*16*/
              myMaterialsByName["uterus_mat"],
              /*17*/
              myMaterialsByName["bladder_mat"],
              /*18*/
              myMaterialsByName["l_compressor_urethral_muscle_mat"],
              /*19*/
              myMaterialsByName["urethra_mat"],
              /*20*/
              myMaterialsByName["l_external_anal_sphincter_muscle_mat"],
            ];
            console.log('annotationSelect', info, annotations[info]);
            textDiv.innerHTML = annotations[info].name + (annotations[info].content ? annotations[info].content.rendered : '');

            //highlight materials upon annotation selection
            api.highlightMaterial(materialHighlight[info]);
          });
          api.addEventListener('annotationFocus', function(info) {
            console.log('annotationFocus', info, annotations[info]);
          });
          api.addEventListener('annotationBlur', function(info) {
            console.log('annotationBlur', info, annotations[info]);
          });
          api.addEventListener('annotationMouseEnter', function(info) {
            console.log('annotationMouseEnter', info, annotations[info]);
          });
          api.addEventListener('annotationMouseLeave', function(info) {
            console.log('annotationMouseLeave', info, annotations[info]);
          });
        });
        console.log('viewerready');
        var url = getNewPastilleURL('rgba(255,255,255,0.0)', 'black', 'black', 'none', 0, 50, 512, 256);
        api.setAnnotationsTexture(url, function() {
          console.log('annotation pastilles changed');
        });
      });
    };
    client.init(uid, {
      success: success,
      error: error,
      autostart: 1,
      preload: 1,
      annotation_tooltip_visible: 0, // Usage: Setting to 0 will hide annotations tooltip by default.
      max_texture_size: 800
    });
  }
  actionSkfb(); //////////////////////////////////
  // GUI Code
  //////////////////////////////////
  function initGui() {
    var controls = document.getElementById('controls');
    var buttonsText = "\n        <div id=\"annotations-sync\"></div>\n       ";
    buttonsText += '<h1 id="a0"></h1>';
    buttonsText += '<h1 id="a1"></h1>';
    buttonsText += '<h1 id="a2"></h1>';
    controls.innerHTML = buttonsText;
  }
  initGui(); //////////////////////////////////
  // GUI Code end
  //////////////////////////////////
  // pastile image generation
  // Code to create textureimage for pastille from svg
  function computePastilles(wCanvas, hCanvas, bgColor, bgBorderColor, fgColor, fgBorderColor, text, numHotspot, wPastille, hPastille) {
    var wSize = wPastille / 10.0;
    var col = wCanvas / wSize;
    var row = hCanvas / wSize;
    var padding = 2;
    var w = wSize - padding;
    var cx;
    var cy = w * 0.5; //var cy = 24;
    var ty = cy + 8;
    var pastille = '';
    var num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    for (var i = 0; i < row; i++) {
      cx = wSize * 0.5;
      for (var k = 0; k < col; k++) {
        //num++;
        var letters = num[k + (10 * i)];
        var circle = "<circle cx=\"".concat(cx, "\"\n            cy=\"").concat(cy, "\"\n            r=\"20\"\n            fill=\"").concat(bgColor, "\"\n            stroke=\"").concat(bgBorderColor, "\"\n            stroke-width=\"2\"/>");
        var textVG = "<text font-size=\"26\"\n          stroke=\"".concat(fgBorderColor, "\"\n          fill=\"").concat(fgColor, "\"\n          font-family=\"sans-serif\"\n          text-anchor=\"middle\"\n          alignment-baseline=\"baseline\"\n          x=\"").concat(cx, "\"\n          y=\"").concat(ty, "\">").concat(letters, "</text>");
        pastille += circle + textVG;
        cx += wSize;
      }
      cy += wSize;
      ty += wSize;
    }
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('version', '1.1');
    s.setAttribute('baseProfile', 'full');
    s.setAttribute('width', wPastille);
    s.setAttribute('height', hPastille);
    s.setAttribute('viewBox', "0 0 ".concat(wPastille, " ").concat(hPastille));
    s.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    s.innerHTML = pastille; // make it base64
    var svg64 = btoa(s.outerHTML);
    var b64Start = 'data:image/svg+xml;base64,';
    var image64 = b64Start + svg64;
    var textureOptions = {
      url: image64,
      colNumber: col,
      padding: padding,
      iconSize: w
    };
    return textureOptions;
  }

  function getNewPastilleURL(bgColor, bgBorderColor, fgColor, fgBorderColor, text, numHotspot, w, h) {
    var imageData;
    imageData = computePastilles(w, h, bgColor, bgBorderColor, fgColor, fgBorderColor, text, numHotspot, w, h);
    return imageData;
  }