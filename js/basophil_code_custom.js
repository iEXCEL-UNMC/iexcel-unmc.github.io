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




            /////////////////////////////////////////BASOPHIL/////////////////////////////////////////
            document.getElementById('basophilCheckbox').addEventListener('click', function() {
              var basophilToHide = [
			  
			  myNodesByNameFromMap2["Basophil_LP_Int_UVed"]

				
			  
			  ];
              var checkbox = document.getElementById('basophilCheckbox');
              if (checkbox.checked != true) {
                for (var i = 0; i < basophilToHide.length; i++) {
                  api.hide(basophilToHide[i]);
                }
              } else {
                for (var i = 0; i < basophilToHide.length; i++) {
                  api.show(basophilToHide[i]);
                }
              }
            });
            ////////////////////////////////////NUCLEUS//////////////////////////////////
            document.getElementById('nucleusCheckbox').addEventListener('click', function() {
              var nucleusToHide =[ myNodesByNameFromMap2["Basophil_nucleus_UVed"]];  
              
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
            document.getElementById('cochleaCheckbox').addEventListener('click', function() {
              var cochleaToHide = [
myNodesByNameFromMap2["Granule_secondary_0"],
myNodesByNameFromMap2["Granule_secondary_2"],
myNodesByNameFromMap2["Granule_secondary_4"],
myNodesByNameFromMap2["Granule_secondary_6"],
myNodesByNameFromMap2["Granule_secondary_8"],
myNodesByNameFromMap2["Granule_secondary_10"],
myNodesByNameFromMap2["Granule_secondary_12"],
myNodesByNameFromMap2["Granule_secondary_14"],
myNodesByNameFromMap2["Granule_secondary_16"],
myNodesByNameFromMap2["Granule_secondary_18"],
myNodesByNameFromMap2["Granule_secondary_20"],
myNodesByNameFromMap2["Granule_secondary_22"],
myNodesByNameFromMap2["Granule_secondary_24"],
myNodesByNameFromMap2["Granule_secondary_26"],
myNodesByNameFromMap2["Granule_secondary_28"],
myNodesByNameFromMap2["Granule_secondary_30"],
myNodesByNameFromMap2["Granule_secondary_32"],
myNodesByNameFromMap2["Granule_secondary_34"],
myNodesByNameFromMap2["Granule_secondary_36"],
myNodesByNameFromMap2["Granule_secondary_38"],
myNodesByNameFromMap2["Granule_secondary_40"],
myNodesByNameFromMap2["Granule_secondary_42"],
myNodesByNameFromMap2["Granule_secondary_44"],
myNodesByNameFromMap2["Granule_secondary_46"],
myNodesByNameFromMap2["Granule_secondary_48"],
myNodesByNameFromMap2["Granule_secondary_50"],
myNodesByNameFromMap2["Granule_secondary_52"],
myNodesByNameFromMap2["Granule_secondary_54"],
myNodesByNameFromMap2["Granule_secondary_56"],
myNodesByNameFromMap2["Granule_secondary_58"],
myNodesByNameFromMap2["Granule_secondary_60"],
myNodesByNameFromMap2["Granule_secondary_62"],
myNodesByNameFromMap2["Granule_secondary_64"],
myNodesByNameFromMap2["Granule_secondary_66"],
myNodesByNameFromMap2["Granule_secondary_68"],
myNodesByNameFromMap2["Granule_secondary_70"],
myNodesByNameFromMap2["Granule_secondary_72"],
myNodesByNameFromMap2["Granule_secondary_74"],
myNodesByNameFromMap2["Granule_secondary_76"],
myNodesByNameFromMap2["Granule_secondary_78"],
myNodesByNameFromMap2["Granule_secondary_80"],
myNodesByNameFromMap2["Granule_secondary_82"],
myNodesByNameFromMap2["Granule_secondary_84"],
myNodesByNameFromMap2["Granule_secondary_86"],
myNodesByNameFromMap2["Granule_secondary_88"],
myNodesByNameFromMap2["Granule_secondary_90"],
myNodesByNameFromMap2["Granule_secondary_92"],
myNodesByNameFromMap2["Granule_secondary_94"],
myNodesByNameFromMap2["Granule_secondary_96"],
myNodesByNameFromMap2["Granule_secondary_98"],
myNodesByNameFromMap2["Granule_secondary_100"],
myNodesByNameFromMap2["Granule_secondary_102"],
myNodesByNameFromMap2["Granule_secondary_104"],
myNodesByNameFromMap2["Granule_secondary_106"],
myNodesByNameFromMap2["Granule_secondary_108"],
myNodesByNameFromMap2["Granule_secondary_110"],
myNodesByNameFromMap2["Granule_secondary_112"],
myNodesByNameFromMap2["Granule_secondary_114"],
myNodesByNameFromMap2["Granule_secondary_116"],
myNodesByNameFromMap2["Granule_secondary_118"],
myNodesByNameFromMap2["Granule_secondary_120"],
myNodesByNameFromMap2["Granule_secondary_122"],
myNodesByNameFromMap2["Granule_secondary_124"],
myNodesByNameFromMap2["Granule_secondary_126"],
myNodesByNameFromMap2["Granule_secondary_128"],
myNodesByNameFromMap2["Granule_secondary_130"],
myNodesByNameFromMap2["Granule_secondary_132"],
myNodesByNameFromMap2["Granule_secondary_134"],
myNodesByNameFromMap2["Granule_secondary_136"],
myNodesByNameFromMap2["Granule_secondary_138"],
myNodesByNameFromMap2["Granule_secondary_140"],
myNodesByNameFromMap2["Granule_secondary_142"],
myNodesByNameFromMap2["Granule_secondary_144"],
myNodesByNameFromMap2["Granule_secondary_146"],
myNodesByNameFromMap2["Granule_secondary_148"],
myNodesByNameFromMap2["Granule_secondary_150"],
myNodesByNameFromMap2["Granule_secondary_152"],
myNodesByNameFromMap2["Granule_secondary_154"],
myNodesByNameFromMap2["Granule_secondary_156"],
myNodesByNameFromMap2["Granule_secondary_158"],
myNodesByNameFromMap2["Granule_secondary_160"],
myNodesByNameFromMap2["Granule_secondary_162"],
myNodesByNameFromMap2["Granule_secondary_164"],
myNodesByNameFromMap2["Granule_secondary_166"],
myNodesByNameFromMap2["Granule_secondary_168"],
myNodesByNameFromMap2["Granule_secondary_170"],
myNodesByNameFromMap2["Granule_secondary_172"],
myNodesByNameFromMap2["Granule_secondary_174"],
myNodesByNameFromMap2["Granule_secondary_176"],
myNodesByNameFromMap2["Granule_secondary_178"],
myNodesByNameFromMap2["Granule_secondary_180"],
myNodesByNameFromMap2["Granule_secondary_182"],
myNodesByNameFromMap2["Granule_secondary_184"],
myNodesByNameFromMap2["Granule_secondary_186"],
myNodesByNameFromMap2["Granule_secondary_188"],
myNodesByNameFromMap2["Granule_secondary_190"],
myNodesByNameFromMap2["Granule_secondary_192"],
myNodesByNameFromMap2["Granule_secondary_194"],
myNodesByNameFromMap2["Granule_secondary_196"],
myNodesByNameFromMap2["Granule_secondary_198"],
myNodesByNameFromMap2["Granule_secondary_200"],
myNodesByNameFromMap2["Granule_secondary_202"],
myNodesByNameFromMap2["Granule_secondary_204"],
myNodesByNameFromMap2["Granule_secondary_206"],
myNodesByNameFromMap2["Granule_secondary_208"],
myNodesByNameFromMap2["Granule_secondary_210"],
myNodesByNameFromMap2["Granule_secondary_212"],
myNodesByNameFromMap2["Granule_secondary_214"],
myNodesByNameFromMap2["Granule_secondary_216"],
myNodesByNameFromMap2["Granule_secondary_218"],
myNodesByNameFromMap2["Granule_secondary_220"],
myNodesByNameFromMap2["Granule_secondary_222"],
myNodesByNameFromMap2["Granule_secondary_224"],
myNodesByNameFromMap2["Granule_secondary_226"],
myNodesByNameFromMap2["Granule_secondary_228"],
myNodesByNameFromMap2["Granule_secondary_230"],
myNodesByNameFromMap2["Granule_secondary_232"],
myNodesByNameFromMap2["Granule_secondary_234"],
myNodesByNameFromMap2["Granule_secondary_236"],
myNodesByNameFromMap2["Granule_secondary_238"],
myNodesByNameFromMap2["Granule_secondary_240"],
myNodesByNameFromMap2["Granule_secondary_242"],
myNodesByNameFromMap2["Granule_secondary_244"],
myNodesByNameFromMap2["Granule_secondary_246"],
myNodesByNameFromMap2["Granule_secondary_248"],
myNodesByNameFromMap2["Granule_secondary_250"],
myNodesByNameFromMap2["Granule_secondary_252"],
myNodesByNameFromMap2["Granule_secondary_254"],
myNodesByNameFromMap2["Granule_secondary_256"],
myNodesByNameFromMap2["Granule_secondary_258"],
myNodesByNameFromMap2["Granule_secondary_260"],
myNodesByNameFromMap2["Granule_secondary_262"],
myNodesByNameFromMap2["Granule_secondary_264"],
myNodesByNameFromMap2["Granule_secondary_266"],
myNodesByNameFromMap2["Granule_secondary_268"],
myNodesByNameFromMap2["Granule_secondary_270"],
myNodesByNameFromMap2["Granule_secondary_272"],
myNodesByNameFromMap2["Granule_secondary_274"],
myNodesByNameFromMap2["Granule_secondary_276"],
myNodesByNameFromMap2["Granule_secondary_278"],
myNodesByNameFromMap2["Granule_secondary_280"],
myNodesByNameFromMap2["Granule_secondary_282"],
myNodesByNameFromMap2["Granule_secondary_284"],
myNodesByNameFromMap2["Granule_secondary_286"],
myNodesByNameFromMap2["Granule_secondary_288"],
myNodesByNameFromMap2["Granule_secondary_290"],
myNodesByNameFromMap2["Granule_secondary_292"],
myNodesByNameFromMap2["Granule_secondary_294"],
myNodesByNameFromMap2["Granule_secondary_296"],
myNodesByNameFromMap2["Granule_secondary_298"],
myNodesByNameFromMap2["Granule_secondary_300"],
myNodesByNameFromMap2["Granule_secondary_302"],
myNodesByNameFromMap2["Granule_secondary_304"],
myNodesByNameFromMap2["Granule_secondary_306"],
myNodesByNameFromMap2["Granule_secondary_308"],
myNodesByNameFromMap2["Granule_secondary_310"],
              ];
             

              var checkbox = document.getElementById('cochleaCheckbox');
              
              if (checkbox.checked != true) {

				hideMat(myMaterialsByName["Granules_baso_sp_mat"]);
                for (var i = 0; i < cochleaToHide.length; i++) {
                  api.hide(cochleaToHide[i]);
                }
              } else {
                  for (var i = 0; i < cochleaToHide.length; i++) {
                    api.show(cochleaToHide[i]);
                  }
                } 
            });
            /////////////////////////////////////////GRANULES/////////////////////////////////////////
            document.getElementById('granulesCheckbox').addEventListener('click', function() {
              var granulesToHide = [
			  
			  myNodesByNameFromMap2["Granule_baso_0"],
myNodesByNameFromMap2["Granule_baso_4"],
myNodesByNameFromMap2["Granule_baso_8"],
myNodesByNameFromMap2["Granule_baso_12"],
myNodesByNameFromMap2["Granule_baso_16"],
myNodesByNameFromMap2["Granule_baso_20"],
myNodesByNameFromMap2["Granule_baso_24"],
myNodesByNameFromMap2["Granule_baso_28"],
myNodesByNameFromMap2["Granule_baso_32"],
myNodesByNameFromMap2["Granule_baso_36"],
myNodesByNameFromMap2["Granule_baso_40"],
myNodesByNameFromMap2["Granule_baso_44"],
myNodesByNameFromMap2["Granule_baso_48"],
myNodesByNameFromMap2["Granule_baso_52"],
myNodesByNameFromMap2["Granule_baso_56"],
myNodesByNameFromMap2["Granule_baso_60"],
myNodesByNameFromMap2["Granule_baso_64"],
myNodesByNameFromMap2["Granule_baso_68"],
myNodesByNameFromMap2["Granule_baso_72"],
myNodesByNameFromMap2["Granule_baso_76"],
myNodesByNameFromMap2["Granule_baso_80"],
myNodesByNameFromMap2["Granule_baso_84"],
myNodesByNameFromMap2["Granule_baso_88"],
myNodesByNameFromMap2["Granule_baso_92"],
myNodesByNameFromMap2["Granule_baso_96"],
myNodesByNameFromMap2["Granule_baso_100"],
myNodesByNameFromMap2["Granule_baso_104"],
myNodesByNameFromMap2["Granule_baso_108"],
myNodesByNameFromMap2["Granule_baso_112"],
myNodesByNameFromMap2["Granule_baso_116"],
myNodesByNameFromMap2["Granule_baso_120"],
myNodesByNameFromMap2["Granule_baso_124"],
myNodesByNameFromMap2["Granule_baso_128"],
myNodesByNameFromMap2["Granule_baso_132"],
myNodesByNameFromMap2["Granule_baso_136"],
myNodesByNameFromMap2["Granule_baso_140"],
myNodesByNameFromMap2["Granule_baso_144"],
myNodesByNameFromMap2["Granule_baso_148"],
myNodesByNameFromMap2["Granule_baso_152"],
myNodesByNameFromMap2["Granule_baso_156"],
myNodesByNameFromMap2["Granule_baso_160"],
myNodesByNameFromMap2["Granule_baso_164"],
myNodesByNameFromMap2["Granule_baso_168"],
myNodesByNameFromMap2["Granule_baso_172"],
myNodesByNameFromMap2["Granule_baso_176"],
myNodesByNameFromMap2["Granule_baso_180"],
myNodesByNameFromMap2["Granule_baso_184"],
myNodesByNameFromMap2["Granule_baso_188"],
myNodesByNameFromMap2["Granule_baso_192"],
myNodesByNameFromMap2["Granule_baso_196"],
myNodesByNameFromMap2["Granule_baso_200"],
myNodesByNameFromMap2["Granule_baso_204"],
myNodesByNameFromMap2["Granule_baso_208"],
myNodesByNameFromMap2["Granule_baso_212"],
myNodesByNameFromMap2["Granule_baso_216"],
myNodesByNameFromMap2["Granule_baso_220"],
myNodesByNameFromMap2["Granule_baso_224"],
myNodesByNameFromMap2["Granule_baso_228"],
myNodesByNameFromMap2["Granule_baso_232"],
myNodesByNameFromMap2["Granule_baso_236"],
myNodesByNameFromMap2["Granule_baso_240"],
myNodesByNameFromMap2["Granule_baso_244"],
myNodesByNameFromMap2["Granule_baso_248"],
myNodesByNameFromMap2["Granule_baso_252"],
myNodesByNameFromMap2["Granule_baso_256"],
myNodesByNameFromMap2["Granule_baso_260"],
myNodesByNameFromMap2["Granule_baso_264"],
myNodesByNameFromMap2["Granule_baso_268"],
myNodesByNameFromMap2["Granule_baso_272"],
myNodesByNameFromMap2["Granule_baso_276"],
myNodesByNameFromMap2["Granule_baso_280"],
myNodesByNameFromMap2["Granule_baso_284"],
myNodesByNameFromMap2["Granule_baso_288"],
myNodesByNameFromMap2["Granule_baso_292"],
myNodesByNameFromMap2["Granule_baso_296"],
myNodesByNameFromMap2["Granule_baso_300"],
myNodesByNameFromMap2["Granule_baso_304"],
myNodesByNameFromMap2["Granule_baso_308"],
myNodesByNameFromMap2["Granule_baso_312"],
myNodesByNameFromMap2["Granule_baso_316"],
myNodesByNameFromMap2["Granule_baso_320"],
myNodesByNameFromMap2["Granule_baso_324"],
myNodesByNameFromMap2["Granule_baso_328"],
myNodesByNameFromMap2["Granule_baso_332"],
myNodesByNameFromMap2["Granule_baso_336"],
myNodesByNameFromMap2["Granule_baso_340"],
myNodesByNameFromMap2["Granule_baso_344"],
myNodesByNameFromMap2["Granule_baso_348"],
myNodesByNameFromMap2["Granule_baso_352"],
myNodesByNameFromMap2["Granule_baso_356"],
myNodesByNameFromMap2["Granule_baso_360"],
myNodesByNameFromMap2["Granule_baso_364"],
myNodesByNameFromMap2["Granule_baso_368"],
myNodesByNameFromMap2["Granule_baso_372"],
myNodesByNameFromMap2["Granule_baso_376"],
myNodesByNameFromMap2["Granule_baso_380"],
myNodesByNameFromMap2["Granule_baso_384"],
myNodesByNameFromMap2["Granule_baso_388"]
			  
			  
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