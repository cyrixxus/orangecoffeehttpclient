//Copyright Cyril Auboin 2016, Tous droits réservés

global_user_token="";
global_user_prenom="";
global_user_solde="";

id_vue_principale=""
if_vue_en_cours="accueil"

tab_vues_ids=["boissons_tarifs", "accueil", "utilisateurs_soldes", "historique_commandes", "login", "commander"];
tab_vues_txt=["Boissons et Tarifs", "Accueil", "Utilisateurs et Soldes", "Historique des Commandes", "Se connecter", "Commande de boissons"];

function reconnect_auto(){
        if(typeof(Storage) !== "undefined") {
        global_user_token=localStorage.getItem("token");
        global_user_prenom=localStorage.getItem("prenom");
        global_user_solde=localStorage.getItem("solde" );
    }
    connexion();
}
function connexion(){
        
    //modifs menus
	if (global_user_token!=null && global_user_token!=""){
        $(label_menu_connecte).text(global_user_prenom);
        $(label_menu_connecte_2).text(global_user_prenom);
        $(menu_connecte).css('display','inline');
        $(menu_login).html("Se déconnecter");
        //$(menu_login).onclick = eval("(function(){deconnexion();return false;});");
        document.getElementById("menu_login").onclick = function(){deconnexion();return false;}
    }
}


function deconnexion(){
    global_user_token="";
    global_user_prenom="";
    global_user_solde="";
    
    localStorage.setItem("token","" );
    localStorage.setItem("prenom","" );
    localStorage.setItem("solde","" );

    //modifs menus

    $(label_menu_connecte).text(global_user_prenom);
    $(label_menu_connecte_2).text(global_user_prenom);
    $(menu_connecte).css('display','none');
    $(menu_login).html("Se connecter");
    //$(menu_login).onclick = eval("(function(){afficherVue('login',window);return false;});");
    document.getElementById("menu_login").onclick = function(){afficherVue('login',window);return false;}
    window.location.href="/";
    
}

function gestion_erreurs(jqXHR,textStatus,errorThrown){
    if (jqXHR.status==401){afficherVue('login',window);}
    else {$(modal_erreur).css("display","inline");$(modal_erreur).css("z-index","10");$(modal_erreur_message).html("<nobr>erreur "+textStatus+" - "+jqXHR.status+"</nobr>");}
}

function afficherVue(lavue,win)
{
    //nettoyage+cacher vieille vue
    if (if_vue_en_cours!="accueil" && lavue!="login"){win["fonction_"+if_vue_en_cours+"_onunload"]();}         
    if (lavue!="login"){$(contenumain).hide(0);}else{$(contenulogin).hide(0);}
    if (lavue!="login"){$('#' + "menu_"+if_vue_en_cours).removeClass("active");}
    
    if (lavue!="login"){if_vue_en_cours=lavue;}

    //afficher+lancer nouvelle vue
    $('#' + "menu_"+if_vue_en_cours).addClass("active");        
    htt=$('#' + "cyr_template_"+lavue).html();
    //$(contenumain).show( "bounce");
    if (lavue!="login"){$(contenumain).show();}else{$(contenulogin).show();}
    if (lavue!="login"){$(contenumain).html(htt);}else{$(contenulogin).html(htt);}
    if (lavue!="accueil"){win["fonction_"+lavue+"_onload"]();}
}
