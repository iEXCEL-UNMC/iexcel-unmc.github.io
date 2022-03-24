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
          ////////////////////////////////////
          /*
    var myMaterials;
    api.getMaterialList(function (err, materials) {
      myMaterials = materials;

      for (var i = 0; i < myMaterials.length; i++) {
        var m = myMaterials[i];
        textures[m.name] = m.channels.AlbedoPBR.texture;
        console.log(m.name, m);
      }
      });
    document.getElementById('a3').addEventListener('click', function () {
      var matID = [27,31,13]
      for (var i = 0; i < matID.length; i++) {
        
        var m = myMaterials[matID[i]];


        m.channels.Opacity = {
          enable: true,
          factor: 0,
        };

        api.setMaterial(m);
      }
    });
    */
          document.getElementById('highlightToggleCheckbox').addEventListener('click', function() {
            var musclesToHighlight = [
              myMaterialsByName["l_bulbospongiosus_muscle_mat"],
              myMaterialsByName["l_bulbospongiosus_muscle_mat"],
              myMaterialsByName["l_ischiocavernosus_muscle_mat"],
              myMaterialsByName["l_ileococcygeus_muscle_mat"],
              myMaterialsByName["l_puborectalis_muscle_mat"],
              myMaterialsByName["l_pubococcygeus_muscle_mat"],
              myMaterialsByName["r_puboanalis_muscle_mat"],
              myMaterialsByName["r_subcutaneous_external_sphincter_muscle_mat"],
              myMaterialsByName["r_anococcygeal_ligament_mat"],
              myMaterialsByName["l_external_anal_sphincter_muscle_mat"],
              myMaterialsByName["r_perineum_mat"],
              myMaterialsByName["r_anococcygeal_ligament_mat"],
              myMaterialsByName["l_anococcygeal_ligament_mat"],
              myMaterialsByName["l_superfical_transverse_perineal_muscle_mat"],
              myMaterialsByName["l_deeo_transverse_perineal_muscle_mat"],
              myMaterialsByName["r_conjoined_longitudinal_and_internal_anal_sphincter_muscle_mat"],
              myMaterialsByName["l_conjoined_longitudinal_and_internal_anal_sphincter_muscle_mat"]
            ];
            var checkbox = document.getElementById('highlightToggleCheckbox');
            if (checkbox.checked) {
              for (var i = 0; i < musclesToHighlight.length; i++) {
                highlightMat(musclesToHighlight[i]);
              }
              //move camera to look-at the dorsolithotomy view
              api.setCameraLookAt([0.04229585882505582, -0.5035818937954755, -1.669077200961981], [0.009803872036463247, 0.013644197169852861, -0.4202285147972783], 4.3, function(err) {});
            } else {
              for (var i = 0; i < musclesToHighlight.length; i++) {
                setToNormal(musclesToHighlight);
              }
            }
            /*
            //setToNormal(musclesToHighlight);
            setTimeout(function() {
              setToNormal(musclesToHighlight);
            }, 5000);
            */
          });

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
            outlineDuration: 5,
          });
          /*
          document.getElementById('a5').addEventListener('click', function() {
            api.highlightMaterial(myMaterialsByName["skin_mat"]);
            setToNormal();
          });
    */
          /////////////////////GET NODE MAP///////////////////////////
          //api.hide(myNodesByNameFromMap2["midsaggital_cutface"]);
          var myNodesByNameFromMap2 = {};
          var bartho = 0;
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
          //////////////////////////////MIDSAGGITAL VIEW///////////////////////////////////////////
          document.getElementById('midSaggitalCheckbox').addEventListener('click', function() {
            var midSaggitalToHide = [
              myNodesByNameFromMap2["L5_bone_"],
              myNodesByNameFromMap2["l_L5_disc_"],
              myNodesByNameFromMap2["l_sacrum_"],
              myNodesByNameFromMap2["l_innominant_bone_"],
              myNodesByNameFromMap2["l_femur_bone_"],
              myNodesByNameFromMap2["l_pubovaginalis_muscle_"],
              myNodesByNameFromMap2["l_conjoined_longitudinal_and_internal_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["l_subcutaneous_external_sphincter_muscle_"],
              myNodesByNameFromMap2["l_inguinal_ligament_"],
              myNodesByNameFromMap2["l_ischiocavernosus_muscle_"],
              myNodesByNameFromMap2["l_perineal_membrane_"],
              myNodesByNameFromMap2["l_superfical_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["l_deep_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["l_pubococcygeus_muscle_"],
              myNodesByNameFromMap2["l_pubococcygeus_ligament_"],
              myNodesByNameFromMap2["l_puborectalis_muscle_"],
              myNodesByNameFromMap2["l_Iliococcygeus_muscle_"],
              myNodesByNameFromMap2["l_tendinous_arch_of_levator_ani_"],
              myNodesByNameFromMap2["l_piriformis_muscle_"],
              myNodesByNameFromMap2["l_obturator_internus_muscle_"],
              myNodesByNameFromMap2["l_sacrotuberous_ligament_"],
              myNodesByNameFromMap2["l_sacrospinous_ligament_"],
              myNodesByNameFromMap2["l_anococcygeal_ligament_"],
              myNodesByNameFromMap2["l_inferior_pubic_ligament_"],
              myNodesByNameFromMap2["l_superior_pubic_ligament_"],
              myNodesByNameFromMap2["l_pubis_symphsis_"],
              myNodesByNameFromMap2["l_coccygeus_muscle_"],
              myNodesByNameFromMap2["l_puboanalis_muscle_"],
              myNodesByNameFromMap2["l_external_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["l_obturator_membrane_"],
              myNodesByNameFromMap2["l_perineum_"],
              myNodesByNameFromMap2["l_bulbospongiosus_muscle_"],
            ];
            var midSaggitalToShowBones = [
              myNodesByNameFromMap2["L5_bone_"],
              myNodesByNameFromMap2["l_L5_disc_"],
              myNodesByNameFromMap2["l_sacrum_"],
              myNodesByNameFromMap2["l_innominant_bone_"],
              myNodesByNameFromMap2["l_femur_bone_"],
            ];
            var midSaggitalToShowMuscles = [
              myNodesByNameFromMap2["l_pubovaginalis_muscle_"],
              myNodesByNameFromMap2["l_conjoined_longitudinal_and_internal_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["l_subcutaneous_external_sphincter_muscle_"],
              myNodesByNameFromMap2["l_inguinal_ligament_"],
              myNodesByNameFromMap2["l_ischiocavernosus_muscle_"],
              myNodesByNameFromMap2["l_perineal_membrane_"],
              myNodesByNameFromMap2["l_superfical_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["l_deep_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["l_pubococcygeus_muscle_"],
              myNodesByNameFromMap2["l_pubococcygeus_ligament_"],
              myNodesByNameFromMap2["l_puborectalis_muscle_"],
              myNodesByNameFromMap2["l_Iliococcygeus_muscle_"],
              myNodesByNameFromMap2["l_tendinous_arch_of_levator_ani_"],
              myNodesByNameFromMap2["l_piriformis_muscle_"],
              myNodesByNameFromMap2["l_obturator_internus_muscle_"],
              myNodesByNameFromMap2["l_sacrotuberous_ligament_"],
              myNodesByNameFromMap2["l_sacrospinous_ligament_"],
              myNodesByNameFromMap2["l_anococcygeal_ligament_"],
              myNodesByNameFromMap2["l_inferior_pubic_ligament_"],
              myNodesByNameFromMap2["l_superior_pubic_ligament_"],
              myNodesByNameFromMap2["l_pubis_symphsis_"],
              myNodesByNameFromMap2["l_coccygeus_muscle_"],
              myNodesByNameFromMap2["l_puboanalis_muscle_"],
              myNodesByNameFromMap2["l_external_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["l_obturator_membrane_"],
              myNodesByNameFromMap2["l_perineum_"],
              myNodesByNameFromMap2["l_bulbospongiosus_muscle_"],
            ];
            var midSaggitalToShow = [
              myNodesByNameFromMap2["midsaggital_cutface"]
            ];
            var checkbox = document.getElementById('midSaggitalCheckbox');
            var boneCheckbox = document.getElementById('bonesCheckbox');
            var muscleCheckbox = document.getElementById('musclesCheckbox');
            if (checkbox.checked == true) {
              for (var i = 0; i < midSaggitalToHide.length; i++) {
                api.hide(midSaggitalToHide[i]);
                //move camera to look-at the midsaggital side view
                api.setCameraLookAt([3.9606068085424737, -0.30469011435116544, 0.5732366512311388], [-0.20118379793902036, 0.4087152094897183, 0.7835704771423364], 4.3, function(err) {});
              }
              if (boneCheckbox.checked) {
                api.show(myNodesByNameFromMap2["midsaggital_cutface"])
              }
            } else {
              if (boneCheckbox.checked && muscleCheckbox.checked) {
                for (var i = 0; i < midSaggitalToHide.length; i++) {
                  api.show(midSaggitalToHide[i]);
                }
              }
              if (!boneCheckbox.checked && muscleCheckbox.checked) {
                for (var i = 0; i < midSaggitalToShowMuscles.length; i++) {
                  api.show(midSaggitalToShowMuscles[i]);
                }
              }
              if (!muscleCheckbox.checked && boneCheckbox.checked) {
                for (var i = 0; i < midSaggitalToShowBones.length; i++) {
                  api.show(midSaggitalToShowBones[i]);
                }
              }
            }
          });
          /////////////////////////////////////////SKIN/////////////////////////////////////////
          document.getElementById('skinCheckbox').addEventListener('click', function() {
            var skinToHide = [myNodesByNameFromMap2["skin_"]];
            var checkbox = document.getElementById('skinCheckbox');
            if (checkbox.checked != true) {
              for (var i = 0; i < skinToHide.length; i++) {
                api.hide(skinToHide[i]);
              }
            } else {
              for (var i = 0; i < skinToHide.length; i++) {
                api.show(skinToHide[i]);
              }
            }
          });
          ////////////////////////////////////NERVES//////////////////////////////////
          document.getElementById('nervesCheckbox').addEventListener('click', function() {
            var nervesToHide = [myNodesByNameFromMap2["r_Vastus_lateralis_muscle_"],
              myNodesByNameFromMap2["common_iliac_artery_"],
              myNodesByNameFromMap2["external_iliac_artery_"],
              myNodesByNameFromMap2["posterior_division_artery_"],
              myNodesByNameFromMap2["superior_gluteal_artery_"],
              myNodesByNameFromMap2["superficial_branch_of_superior_gluteal_artery_"],
              myNodesByNameFromMap2["deep_branch_of_superior_gluteal_artery_"],
              myNodesByNameFromMap2["superior_division_of_deep_branch_artery_"],
              myNodesByNameFromMap2["inferior_division_of_deep_branch_artery_"],
              myNodesByNameFromMap2["internal_iliac_artery_"],
              myNodesByNameFromMap2["obturator_artery_"],
              myNodesByNameFromMap2["iliolumbar_artery_"],
              myNodesByNameFromMap2["inferior_rectal_artery_"],
              myNodesByNameFromMap2["posterior_labial_artery_"],
              myNodesByNameFromMap2["lateral_sacral_artery_"],
              myNodesByNameFromMap2["inferior_gluteal_artery_"],
              myNodesByNameFromMap2["dorsal_artery_of_the_clitoris_"],
              myNodesByNameFromMap2["descending_branch_of_the_lateral_circumflex_artery_"],
              myNodesByNameFromMap2["medial_circumflex_artery_"],
              myNodesByNameFromMap2["deep_profunda_artery_"],
              myNodesByNameFromMap2["lateral_circumflex_femoral_artery_"],
              myNodesByNameFromMap2["femoral_artery_"],
              myNodesByNameFromMap2["inferior_epigastric_artery_"],
              myNodesByNameFromMap2["deep_circumflex_iliac_artery_"],
              myNodesByNameFromMap2["internal_pudendal_artery_"],
              myNodesByNameFromMap2["perineal_artery_"],
              myNodesByNameFromMap2["uterine_artery_"],
              myNodesByNameFromMap2["vaginal_artery_"],
              myNodesByNameFromMap2["inferior_rectal_artery2_"],
              myNodesByNameFromMap2["middle_rectal_artery_"],
              myNodesByNameFromMap2["ovarian_artery_"],
              myNodesByNameFromMap2["superior_vesicle_artery_"],
              myNodesByNameFromMap2["spinal_ganglia_"],
              myNodesByNameFromMap2["hypogastric_plexus_"],
              myNodesByNameFromMap2["inferior_rectal_nerve_"],
              myNodesByNameFromMap2["dorsal_nerve_of_the_clitoris_"],
              myNodesByNameFromMap2["posterior_labial_nerve_"],
              myNodesByNameFromMap2["superficial_branch_of_perineal_nerve_"],
              myNodesByNameFromMap2["deep_branch_of_perineal_nerve_"],
              myNodesByNameFromMap2["perineal_nerve_"],
              myNodesByNameFromMap2["pudendal_nerve_"],
              myNodesByNameFromMap2["genitofemoral_nerve_"],
              myNodesByNameFromMap2["genital_branch_of_genitofemoral_nerve_"],
              myNodesByNameFromMap2["S4_nerve_"],
              myNodesByNameFromMap2["S3_nerve_"],
              myNodesByNameFromMap2["S2_nerve_"],
              myNodesByNameFromMap2["S1_nerve_"],
              myNodesByNameFromMap2["l5_nerve_"],
              myNodesByNameFromMap2["l4_nerve_"],
              myNodesByNameFromMap2["femoral_nerve_"],
              myNodesByNameFromMap2["L4_nerve_"],
              myNodesByNameFromMap2["L5_nerve_"],
              myNodesByNameFromMap2["S1_nerve_posterior"],
              myNodesByNameFromMap2["S2_nerve_posterior"],
              myNodesByNameFromMap2["inferior_gluteal_nerve_"],
              myNodesByNameFromMap2["superior_gluteal_nerve_"],
            ];
            var checkbox = document.getElementById('nervesCheckbox');
            if (checkbox.checked != true) {
              for (var i = 0; i < nervesToHide.length; i++) {
                api.hide(nervesToHide[i]);
                api.hide(687); //S1 NERVE
                api.hide(772); //S1 DUPLICATE
                api.hide(673); //S2 NERVE
                api.hide(786); //S2 DUPLICATE
              }
            } else {
              for (var i = 0; i < nervesToHide.length; i++) {
                api.show(nervesToHide[i]);
                api.show(687); //S1
                api.show(772); //S1
                api.show(673); //S2
                api.show(786); //S2
              }
            }
          });
          /////////////////////////////////////////PELVIC FLOOR MUSCLES/////////////////////////////////////////
          document.getElementById('musclesCheckbox').addEventListener('click', function() {
            var musclesToHide = [myNodesByNameFromMap2["l_vastus_lateralis_muscle"],
              myNodesByNameFromMap2["r_pubovaginalis_muscle_"],
              myNodesByNameFromMap2["r_conjoined_longitudinal_and_internal_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["r_subcutaneous_external_sphincter_muscle_"],
              myNodesByNameFromMap2["r_puboanalis_muscle_"],
              myNodesByNameFromMap2["r_inguinal_ligament_"],
              myNodesByNameFromMap2["r_ischiocavernosus_muscle_"],
              myNodesByNameFromMap2["r_perineal_membrane_"],
              myNodesByNameFromMap2["r_superfical_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["r_deep_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["r_pubococcygeus_muscle_"],
              myNodesByNameFromMap2["r_pubococcygeus_ligament_"],
              myNodesByNameFromMap2["r_puborectalis_muscle_"],
              myNodesByNameFromMap2["r_tendinous_arch_of_levator_ani_"],
              myNodesByNameFromMap2["r_Iliococcygeus_muscle_"],
              myNodesByNameFromMap2["r_piriformis_muscle_"],
              myNodesByNameFromMap2["r_obturator_internus_muscle_"],
              myNodesByNameFromMap2["r_sacrotuberous_ligament_"],
              myNodesByNameFromMap2["r_sacrospinous_ligament_"],
              myNodesByNameFromMap2["r_coccygeus_muscle_"],
              myNodesByNameFromMap2["r_external_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["r_superior_pubic_ligament_"],
              myNodesByNameFromMap2["r_pubis_symphsis_"],
              myNodesByNameFromMap2["r_inferior_pubic_ligament_"],
              myNodesByNameFromMap2["r_anococcygeal_ligament_"],
              myNodesByNameFromMap2["r_obturator_membrane_"],
              myNodesByNameFromMap2["r_bulbospongiosus_muscle_"],
              myNodesByNameFromMap2["r_perineum_"],
              myNodesByNameFromMap2["l_pubovaginalis_muscle_"],
              myNodesByNameFromMap2["l_conjoined_longitudinal_and_internal_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["l_subcutaneous_external_sphincter_muscle_"],
              myNodesByNameFromMap2["l_inguinal_ligament_"],
              myNodesByNameFromMap2["l_ischiocavernosus_muscle_"],
              myNodesByNameFromMap2["l_perineal_membrane_"],
              myNodesByNameFromMap2["l_superfical_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["l_deep_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["l_pubococcygeus_muscle_"],
              myNodesByNameFromMap2["l_pubococcygeus_ligament_"],
              myNodesByNameFromMap2["l_puborectalis_muscle_"],
              myNodesByNameFromMap2["l_Iliococcygeus_muscle_"],
              myNodesByNameFromMap2["l_tendinous_arch_of_levator_ani_"],
              myNodesByNameFromMap2["l_piriformis_muscle_"],
              myNodesByNameFromMap2["l_obturator_internus_muscle_"],
              myNodesByNameFromMap2["l_sacrotuberous_ligament_"],
              myNodesByNameFromMap2["l_sacrospinous_ligament_"],
              myNodesByNameFromMap2["l_anococcygeal_ligament_"],
              myNodesByNameFromMap2["l_inferior_pubic_ligament_"],
              myNodesByNameFromMap2["l_superior_pubic_ligament_"],
              myNodesByNameFromMap2["l_pubis_symphsis_"],
              myNodesByNameFromMap2["l_coccygeus_muscle_"],
              myNodesByNameFromMap2["l_puboanalis_muscle_"],
              myNodesByNameFromMap2["l_external_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["l_obturator_membrane_"],
              myNodesByNameFromMap2["l_perineum_"],
              myNodesByNameFromMap2["l_bulbospongiosus_muscle_"],
            ];
            var musclesToShowMidSagg = [myNodesByNameFromMap2["l_vastus_lateralis_muscle"],
              myNodesByNameFromMap2["r_compressor_urethrae_muscle_"],
              myNodesByNameFromMap2["r_urethrovaginal_sphincter_muscle_"],
              myNodesByNameFromMap2["r_pubovaginalis_muscle_"],
              myNodesByNameFromMap2["r_conjoined_longitudinal_and_internal_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["r_subcutaneous_external_sphincter_muscle_"],
              myNodesByNameFromMap2["r_puboanalis_muscle_"],
              myNodesByNameFromMap2["r_inguinal_ligament_"],
              myNodesByNameFromMap2["r_ischiocavernosus_muscle_"],
              myNodesByNameFromMap2["r_perineal_membrane_"],
              myNodesByNameFromMap2["r_superfical_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["r_deep_transverse_perineal_muscle_"],
              myNodesByNameFromMap2["r_pubococcygeus_muscle_"],
              myNodesByNameFromMap2["r_pubococcygeus_ligament_"],
              myNodesByNameFromMap2["r_puborectalis_muscle_"],
              myNodesByNameFromMap2["r_tendinous_arch_of_levator_ani_"],
              myNodesByNameFromMap2["r_Iliococcygeus_muscle_"],
              myNodesByNameFromMap2["r_piriformis_muscle_"],
              myNodesByNameFromMap2["r_obturator_internus_muscle_"],
              myNodesByNameFromMap2["r_sacrotuberous_ligament_"],
              myNodesByNameFromMap2["r_sacrospinous_ligament_"],
              myNodesByNameFromMap2["r_coccygeus_muscle_"],
              myNodesByNameFromMap2["r_external_anal_sphincter_muscle_"],
              myNodesByNameFromMap2["r_superior_pubic_ligament_"],
              myNodesByNameFromMap2["r_pubis_symphsis_"],
              myNodesByNameFromMap2["r_inferior_pubic_ligament_"],
              myNodesByNameFromMap2["r_anococcygeal_ligament_"],
              myNodesByNameFromMap2["r_obturator_membrane_"],
              myNodesByNameFromMap2["r_bulbospongiosus_muscle_"],
              myNodesByNameFromMap2["r_perineum_"],
            ];
            var checkbox = document.getElementById('musclesCheckbox');
            var midSaggCheckbox = document.getElementById('midSaggitalCheckbox');
            if (checkbox.checked != true) {
              for (var i = 0; i < musclesToHide.length; i++) {
                api.hide(musclesToHide[i]);
              }
            } else {
              //check to see if midsaggital checkbox is on
              //if yes, then only show the right muscles when checked
              if (midSaggCheckbox.checked != true) {
                for (var i = 0; i < musclesToHide.length; i++) {
                  api.show(musclesToHide[i]);
                }
              } else {
                for (var i = 0; i < musclesToShowMidSagg.length; i++) {
                  api.show(musclesToShowMidSagg[i]);
                }
              }
            }
          });
          //////////////////////////////////////////ORGANS//////////////////////////////////////
          document.getElementById('organsCheckbox').addEventListener('click', function() {
            var organsToHide = [
              myNodesByNameFromMap2["r_Skenes_gland_"],
              myNodesByNameFromMap2["l_Skenes_gland_"],
              myNodesByNameFromMap2["r_Bartholins_gland_"],
              myNodesByNameFromMap2["l_Bartholins_gland_"],
              myNodesByNameFromMap2["l_crus_of_the_clitoris_"],
              myNodesByNameFromMap2["r_crus_of_the_clitoris_"],
              myNodesByNameFromMap2["clitoral_hood_"],
              myNodesByNameFromMap2["vaginal_introitious_"],
              myNodesByNameFromMap2["labia_minora_"],
              myNodesByNameFromMap2["invis_vaginal_opening_"],
              myNodesByNameFromMap2["vaginal_mucosa_"],
              myNodesByNameFromMap2["r_vestibular_bulb_"],
              myNodesByNameFromMap2["l_vestibular_bulb_"],
              myNodesByNameFromMap2["endometrium_"],
              myNodesByNameFromMap2["cervix_surface_"],
              myNodesByNameFromMap2["r_ovary_"],
              myNodesByNameFromMap2["r_uterosacral_ligament_"],
              myNodesByNameFromMap2["l_uterosacral_ligament_"],
              myNodesByNameFromMap2["outer_vaginal_surface_"],
              myNodesByNameFromMap2["l_ovary_"],
              myNodesByNameFromMap2["l_round_ligament_"],
              myNodesByNameFromMap2["r_round_ligament_"],
              myNodesByNameFromMap2["r_ovarian_ligament_"],
              myNodesByNameFromMap2["l_ovarian_ligament_"],
              myNodesByNameFromMap2["l_fallopian_tube_"],
              myNodesByNameFromMap2["r_fallopian_tube_"],
              myNodesByNameFromMap2["uterus_"],
              myNodesByNameFromMap2["l_urethral_rhabdosphincter_"],
              myNodesByNameFromMap2["r_urethral_rhabdosphincter_"],
              myNodesByNameFromMap2["r_inter_muscular_ureter_"],
              myNodesByNameFromMap2["l_inter_muscular_ureter_"],
              myNodesByNameFromMap2["l_rhabdosphincter_muscle_"],
              myNodesByNameFromMap2["r_rhabdosphincter_muscle_"],
              myNodesByNameFromMap2["bladder_mucosa_"],
              myNodesByNameFromMap2["bladder_"],
              myNodesByNameFromMap2["r_ureter_"],
              myNodesByNameFromMap2["l_ureter_"],
              myNodesByNameFromMap2["colon"],
              myNodesByNameFromMap2["l_urethrovaginal_sphincter_muscle_"],
              myNodesByNameFromMap2["l_compressor_urethrae_muscle_"],
              myNodesByNameFromMap2["r_compressor_urethrae_muscle_"],
              myNodesByNameFromMap2["r_urethrovaginal_sphincter_muscle_"],
            ];
            var checkbox = document.getElementById('organsCheckbox');
            if (checkbox.checked != true) {
              for (var i = 0; i < organsToHide.length; i++) {
                api.hide(organsToHide[i]);
              }
            } else {
              for (var i = 0; i < organsToHide.length; i++) {
                api.show(organsToHide[i]);
              }
            }
          });
          /////////////////////////////////////////BONES/////////////////////////////////////////
          document.getElementById('bonesCheckbox').addEventListener('click', function() {
            var bonesToHide = [myNodesByNameFromMap2["r_femur_bone_"],
              myNodesByNameFromMap2["l_femur_bone_"],
              myNodesByNameFromMap2["r_innominant_bone_"],
              myNodesByNameFromMap2["l_innominant_bone_"],
              myNodesByNameFromMap2["l_sacrum_"],
              myNodesByNameFromMap2["r_sacrum_"],
              myNodesByNameFromMap2["L5_bone_"],
              myNodesByNameFromMap2["l_L5_disc_"],
              myNodesByNameFromMap2["sacrum_"],
              myNodesByNameFromMap2["r_L5_bone_"],
              myNodesByNameFromMap2["r_L5_disc_"],
              myNodesByNameFromMap2["midsaggital_cutface"],
            ];
            var bonesToShowMidSagg = [myNodesByNameFromMap2["r_femur_bone_"],
              myNodesByNameFromMap2["r_innominant_bone_"],
              myNodesByNameFromMap2["r_sacrum_"],
              myNodesByNameFromMap2["r_L5_bone_"],
              myNodesByNameFromMap2["r_L5_disc_"],
              myNodesByNameFromMap2["midsaggital_cutface"],
            ];
            var checkbox = document.getElementById('bonesCheckbox');
            var midSaggCheckbox = document.getElementById('midSaggitalCheckbox');
            if (checkbox.checked != true) {
              for (var i = 0; i < bonesToHide.length; i++) {
                api.hide(bonesToHide[i]);
              }
            } else {
              //check to see if midsaggital checkbox is on
              //if yes, then only show the right bones when checked
              if (midSaggCheckbox.checked != true) {
                for (var i = 0; i < bonesToHide.length; i++) {
                  api.show(bonesToHide[i]);
                }
              } else {
                for (var i = 0; i < bonesToShowMidSagg.length; i++) {
                  api.show(bonesToShowMidSagg[i]);
                }
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
              myMaterialsByName["l_ischiocavernosus_muscle_mat"],
              /*2*/
              myMaterialsByName["urethral_meatus_mat"],
              /*3*/
              myMaterialsByName["l_bulbospongiosus_muscle_mat"],
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