const identification = require('../models/identification');
const gestionVisit = require('../models/gestionVisite');
const gestionUser = require('../models/gestionUser');
const gestionCertification = require('../models/gestionCertifications');
const url = require('url');
const moment = require('moment');
const bcrypt = require('bcryptjs');
module.exports = {

    infosPersonnellesDisplay: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            gestionUser.getAllInfosUsers(id, function (userInfos) {
                gestionCertification.getAllCertification(id, function (certifs) {
                    res.render('pages/user/informationPerso', {userCertifs: certifs, userInfos: userInfos, isConnected: id, droits: droits, moment: moment});
                });
            });
        });
    },


    updateInfosPerso: function(req, res) {

        const nom = req.sanitize(req.body.nom);
        const prenom = req.sanitize(req.body.prenom);
        const mail = req.sanitize(req.body.mail);
        const age = req.sanitize(req.body.age);
        const pwd = req.sanitize(req.body.oldPwd);
        const pwd1 = req.sanitize(req.body.newPwd1);
        const pwd2 = req.sanitize(req.body.newPwd2);

        if(nom == null || prenom == null || mail == null || age == null) {
            res.redirect('/profil/infosPerso');
        }

        identification.extractUserFromCookieToken(req, function (id) {
            infosUser = [nom, prenom, mail, age, id];
            gestionUser.updateUser(infosUser, function (result) {
                if(pwd != null && pwd1 == pwd2) {
                    identification.extractUserFromCookieToken(req, function (id) {
                        gestionUser.getPwdUser(id, function (pwdUser) {
                            bcrypt.compare(pwd, pwdUser[0].passwordUser, function (err, match) {
                                if (match) {
                                    bcrypt.hash(pwd1, 4, function (err, bcryptPassword) {
                                        gestionUser.updateUserPwd(bcryptPassword, id, function (result) {
                                            res.redirect('/');
                                        });
                                    });
                                } else {
                                    res.redirect('/profil/infosPerso');
                                }
                            })
                        })
                    })
                } else {
                    res.redirect('/profil/infosPerso');
                }
            });
        });
    },

    listeVisiteDisplay: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            gestionUser.getAllVisitUser(id, function (visits) {
                res.render('pages/user/listeVisites', {listVisit: visits, isConnected: id, droits: droits, moment: moment});
            });
        });
    },

    planningDisplay: function(req, res) {
        res.render('pages/user/planning');
    },

    ajoutVisit: function (req, res) {
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.split('/')[2];

        identification.extractUserFromCookieToken(req, function (id, droits) {
            console.log(id, droits);
            gestionVisit.insertVisit(id, pathname,   function (result) {
                res.redirect('/profil/listeVisites');
            });
        });
    },

    updateVisite: function (req, res) {
        var avis = req.sanitize(req.body.note);
        var nomSite = req.sanitize(req.body.nomSite);
        var date = req.sanitize(req.body.dateV);

        identification.extractUserFromCookieToken(req, function (id) {
            const infos = [avis, id, nomSite, date];
            gestionVisit.updateVisite(infos, function (result) {
                res.redirect('/profil/listeVisites');
            })
        });
    },

    supprimerProfil: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id) {
            gestionUser.deleteProfil(id, function (result) {
                res.redirect('/deconnexion');
            });
        });
    },

    deleteCertif: function (req, res) {
        const nomCertif = req.sanitize(req.body.nomCertif);

        identification.extractUserFromCookieToken(req, function (id) {
            const infos = [nomCertif, id];
            gestionUser.deleteCertif(infos, function (result) {
                res.redirect('/profil/infosPerso');
            })
        })
    },


    ajouterCertif: function (req, res) {
        const nomCertif = req.sanitize(req.body.nomCertif);

        identification.extractUserFromCookieToken(req, function (id) {
            const infos = [id, nomCertif];
            gestionUser.insertCertif(infos, function (result) {
                res.redirect('/profil/infosPerso');
            })
        })
    },
};