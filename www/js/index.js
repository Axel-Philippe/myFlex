/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * 
 * 
 * author : Axel GATINEAU PHILIPPE
 */


var app = {
    // Constructeur de l'application
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        $("#calcul").on("click", calculerHoraires);
    },

    // Met à jour le DOM à la réception d'un vévènement. 
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

app.initialize();

/**
 * Converti les heures en nombres. 
 * @param {Heure à convertir en nombre} heure 
 * @param {Minute à convertir en nombre} minute 
 */
function calculHoraire(heure, minute){
    return Number(heure) + Number(minute) *(10/6)/100;
}

/**
 * Contrôle sur les horaires : 
 *  - L'horaire d'arrivée doit être la plus tôt.
 *  - L'horaire de début du repas doit être supérieure à l'horaire d'arrivée et inférieure à l'horaire de fin de repas.
 *  - L'horaire de de fin de repas doit être supérieure aux horaires d'arrivée et de début de repas.
 */
function controleHoraire(horaireA, horaireD, horaireF){
    if(horaireF < horaireD){
        $("#affichage").html("<p class='text-danger'>Attention : l'horaire de début de repas doit être plus tôt que l'horaire de fin de repas.</p>");
        return true;
    }

    if (horaireF < horaireA || horaireD < horaireA){
        $("#affichage").html("<p class='text-danger'>Attention : l'horaire de d'arrivée doit être plus tôt que l'horaire de début/fin de repas.</p>");
        return true;
    }
}
/*
function remplirHoraire(){

    if(switchPredefini = true){
        mettrePredefini();
    }
    else if(switchPrefeini && switchData = true || witchData = true){
        recupereHoraire();
    }else {
        faire des add atribute vides
    }



}

function sauvegardeHoraire(lien, hA, mA, hD, mD, hF, mF, flex){
    const fs = require('fs')
 
    let horaireSauvee = {
    "heureArrivee" : hA
    };
    
    let donnees = JSON.stringify(horaireSauvee)
    fs.writeFileSync('../vendor/json/donnees.json', donnees)
}

function setPredefini(){
    //TODO
}


function insereHoraireSauvee(){
    $.getJSON('../vendor/json/donnees.json', function(donnees){
        let xHeureArrivee = donnees.heureArrivee;
        $("#heureArrivee").attr("value", donnees.heureArrivee);
        $("#minuteArrivee").attr("value", donnees.minuteArrivee);

        $("#heureDebut").attr("value", donnees.heureDebut);
        $("#minuteDebut").attr("value", donnees.minuteDebut);

        $("#heureFin").attr("value", donnees.heureFin);
        $("#minuteFin").attr("value", donnees.minuteFin);

        $("#flex").attr("value", donnees.flex);

    });
}


function inserePredefinie(){
    $.getJSON('../vendor/json/predefini.json', function(donnees){
        let xHeureArrivee = donnees.heureArrivee;
        $("#heureArrivee").attr("value", donnees.heureArrivee);
        $("#minuteArrivee").attr("value", donnees.minuteArrivee);

        $("#heureDebut").attr("value", donnees.heureDebut);
        $("#minuteDebut").attr("value", donnees.minuteDebut);

        $("#heureFin").attr("value", donnees.heureFin);
        $("#minuteFin").attr("value", donnees.minuteFin);

        $("#flex").attr("value", donnees.flex);

    });
}*/

/**
 * Changement du format de l'heure de nombre à horaire
 * @param {Horaire de départ} horaireD 
 * @param {Horaire Flex} horaireF 
 */
function afficheHoraire(horaireD, horaireF){
        //Traitement horaire départ
        let heureDepart = Math.trunc(horaireD);
        let calculMinuteD = Number(horaireD) - Number(heureDepart);
        let minuteDepart =  Math.round(calculMinuteD/(10/60)*10);
        
        let horaireDepartAffichage = 0;
        if(minuteDepart < 10){
            horaireDepartAffichage = heureDepart + "h0" + minuteDepart;
        }else{
            horaireDepartAffichage = heureDepart + "h" + minuteDepart;
        }
    
        //Traitement horaire flex
        let heureFlex = Math.trunc(horaireF);
        let calculMinuteF = Number(horaireF) - Number(heureFlex);
        let minuteFlex =  Math.round(calculMinuteF/(10/60)*10);
    
        let horaireFlexAffichage = 0;
        if(minuteFlex < 10){
            horaireFlexAffichage = heureFlex + "h0" + minuteFlex;
        }else{
            horaireFlexAffichage = heureFlex + "h" + minuteFlex;
        }
    
        $("#affichage").html("");
        $("#affichage").append("<h1>")
                    .append(horaireDepartAffichage)
                    .append("<br>")
                    .append(horaireFlexAffichage);
}

function calculerHoraires(){
    let heureArrivee = $("#heureArrivee").val();
    let minuteArrivee = $("#minuteArrivee").val();

    let heureDebut = $("#heureDebut").val();
    let minuteDebut = $("#minuteDebut").val();

    let heureFin = $("#heureFin").val();
    let minuteFin = $("#minuteFin").val();

    let flex = $("#flex").val();

    //if($("#sauvegarde").is(":checked")){
        //sauvegardeHoraire("../vendor/json/donnees.json", heureArrivee, minuteArrivee, heureDebut, minuteDebut, heureFin, minuteFin, flex);
    //}
    

    let horaireArrivee = calculHoraire(heureArrivee, minuteArrivee);
    console.log(horaireArrivee);
    let horaireDebut = calculHoraire(heureDebut, minuteDebut);
    console.log(horaireArrivee);
    let horaireFin = calculHoraire(heureFin, minuteFin);
    console.log(horaireFin);

    //Si l'horaire de fin est plus petit que l'horaire de début => erreur
    if(controleHoraire(horaireArrivee, horaireDebut, horaireFin) == true){
        return;
    }


    let horaireDepart = horaireArrivee + 7.5 + (horaireFin - horaireDebut);
    let horaireFlex = 0;
    
    if(flex != undefined || flex != "0.0"){
        horaireFlex = Number(horaireDepart) - Number(flex);
    }else{
        horaireFlex = horaireDepart;
    }


    afficheHoraire(horaireDepart, horaireFlex);
}
