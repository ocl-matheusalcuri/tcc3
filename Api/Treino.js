const express = require('express');
const mongoose = require('mongoose');
const Treino = require('../DB/Treino');
const Personal = require('../DB/Personal');
const Aluno = require('../DB/Aluno');
const route = express.Router();
mongoose.set('useFindAndModify', false);

route.get('/getTreinosByAlunoId', async (req, res) => {
    const { alunoId } = req.body;
    let treino = await Treino.find({ alunoId: alunoId }).then((response) => {
        if (response.length != 0) {
            res.json(response);
        }
        else {
            res.status(404).send("Não existem treinos para esse aluno");
        }
    });
});

route.get('/getTreinosByPersonalId', async (req, res) => {
    const { personalId } = req.body;
    let treino = await Treino.find({ personalId: personalId }).then((response) => {
        if (response.length != 0) {
            res.json(response);
        }
        else {
            res.status(404).send("Não existem treinos para esse personal");
        }
    });
});

route.post('/cadastrarTreino', async (req, res) => {
    const { alunoId, personalId, nome, descricaoTreino } = req.body;

    let treino = {};
    if (alunoId != null && personalId != null && nome != "" && descricaoTreino != "") {
        await Personal.findById(personalId).then((responsePersonal) => {
            if (responsePersonal != null) {
                Aluno.findById(alunoId).then((responseAluno) => {
                    if (responseAluno != null) {
                        treino.alunoId = alunoId;
                        treino.personalId = personalId;
                        treino.nome = nome;
                        treino.descricaoTreino = descricaoTreino;
                        let treinoModel = new Treino(treino);
                        treinoModel.save();
                        console.log(treinoModel);
                        res.json(treinoModel);
                    } else {
                        res.status(404).send("Aluno Inexistente");
                    }
                });
            } else {
                res.status(404).send("Personal Inexistente");
            }
        });
    }
    else {
        res.status(400).send("Preencha todos os dados");
    }

});

route.put('/editarTreino', async (req, res) => {
    const { treinoId, nome, descricaoTreino } = req.body;
    let treino = await Treino.findById(treinoId).then((response) => {
        if (response != null) {
            if (nome != "" && descricaoTreino != "") {
                response.nome = nome;
                response.descricaoTreino = descricaoTreino;
            } else {
                res.status(400).send("Preencha todos os dados");
            }
            response.save();
            res.json(response);
        }
        else {
            res.status(404).send("Treino Inexistente");
        }
    });
});

route.delete('/deletarTreino', async (req, res) => {
    const { treinoId } = req.body;
    Treino.findByIdAndRemove(treinoId).exec().then((response) => {
        if (response != null) {
            res.status(200).send("Treino Excluido com Sucesso");
        }
        else {
            res.status(404).send("Treino Inexistente");
        }
    });
});

route.delete('/deletarTreinoByAlunoId', async (req, res) => {
    const { alunoId } = req.body;
    Treino.find({ alunoId: alunoId }).then((response) => {
        if (response.length != 0) {
            for (let i = 0; i < response.length; i++) {
                Treino.findByIdAndRemove(response[i]._id).exec().then((response) => {
                    if (response != null) {
                        res.status(200).send("Treino Excluido com Sucesso");
                    }
                    else {
                        res.status(404).send("Treino Inexistente");
                    }
                });
            }
        }
        else {
            res.status(404).send("Não existem treinos para esse aluno");
        }
    });
});

route.delete('/deletarTreinoByPersonalId', async (req, res) => {
    const { personalId } = req.body;
    Treino.find({ personalId: personalId }).then((response) => {
        if (response.length != 0) {
            for (let i = 0; i < response.length; i++) {
                Treino.findByIdAndRemove(response[i]._id).exec().then((response) => {
                    if (response != null) {
                        res.status(200).send("Treino Excluido com Sucesso");
                    }
                    else {
                        res.status(404).send("Treino Inexistente");
                    }
                });
            }
        }
        else {
            res.status(404).send("Não existem treinos para esse personal");
        }
    });
});

module.exports = route;

