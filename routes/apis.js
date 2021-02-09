const Router = require('express').Router;
const axios = require('axios').default;
const router = Router();
const {like} = require('sequelize')["Op"];
const RepositoryModel = require('../models/repository');
const TagModel = require('../models/tag');

RepositoryModel.hasMany(TagModel,{foreignKey:'repositoryId',constraints:true});
RepositoryModel.sync();
TagModel.sync();
const preApi = '/:username/starred';

router.get(preApi, async (req, res) => {
    let username = req.params.username;
    let tag = req.query.tag;
    let result;
    if (tag) {
        result = await getReposWithTag(username,tag);
    } else {
        result = await getAllStarredRepos(username);
        RepositoryModel.bulkCreate(result, { ignoreDuplicates: true }).catch(e => console.log(e));
    }
    res.json(result);
});

async function getReposWithTag(username, tag) {
    return await TagModel.findAll({
        where: {
            username: username,
            tag: {
                [like] : `%${tag}%`
            }
        },
        include:RepositoryModel
    });
}

async function getAllStarredRepos(username) {
    let response = await axios.get(`https://api.github.com/users/${username}/starred`);
    let rawRepos = response.data;
    let desiredSturucredRepos = rawRepos.map((v) => {
        let { id, name, description, url, language } = v;
        return { id, name , description , url , language };
    });
    return desiredSturucredRepos;
}


router.get(`${preApi}/:repoId/tags`, async (req, res) => { //returns all tags of a repository
    let username = req.params.username;
    let repoId = req.params.repoId;
    const result = await TagModel.findAll({
        where: {
            username: username,
            repositoryId: repoId
        }
    })
    res.json(result.map((v) => v["tag"]));
});

router.post(`${preApi}/:repoId/tags`, async (req, res) => { //adds new tags to the repository
    let username = req.params.username;
    let repositoryId = req.params.repoId;
    let tag = req.body.tag;

    const tagInstance = TagModel.build({ repositoryId, username, tag });
    try {
        await tagInstance.save();
    } catch (e) {
        console.log(e);
        return res.status(200).send("Already Added");//don't worry the tag already added
    }
    res.status(201).send("Successfully Added");
});

router.delete(`${preApi}/:repoId/tags`, (req, res) => { //deletes all tags of a repository
    TagModel.destroy({
        where: {
            repositoryId: req.params.repoId,
            username: req.params.username,
        }
    });
    res.send("Deleted");
});

router.delete(`${preApi}/:repoId/tags/:tag`, (req, res) => { //deletes a particular tag of a repository
    TagModel.destroy({
        where: {
            repositoryId: req.params.repoId,
            username: req.params.username,
            tag: req.params.tag
        }
    });
    res.send("Deleted");
});


module.exports = router;