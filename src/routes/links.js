const express = require('express');
const router = express.Router();

const pool = require('../database'); 
const {isLoggedIn} = require ('../lib/auth')

router.get('/add',isLoggedIn,(req,res)=>{
    res.render('links/add');
});

//aca se reciben los datos del formulario y se agragan a la base de datos

router.post('/add',isLoggedIn, async (req,res)=>{
    const {title,url,descripcion} = req.body;
    const newLink = {
        title,
        url,
        descripcion,
        user_id :req.user.id
    };
    await pool.query('INSERT INTO links set?', [newLink]);
    req.flash('success','link guardado correctamente');
    res.redirect('/links');
});

router.get('/',isLoggedIn, async (req,res)=>{
   const links= await pool.query('SELECT * FROM links Where user_id= ?',[req.user.id]);
   
   res.render('links/list',{links});
});

//aca creo la ruta de eliminar

router.get('/delete/:id',isLoggedIn, async(req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID =?',[id]);
    req.flash('success','links removed successfully')
    res.redirect('/links');
});

//editar

router.get('/edit/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id=?',[id]);
    res.render('links/edit',{link:links[0]});
});
router.post('/edit/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const {title,url,descripcion} = req.body;
    const newLink = {
        title,
        url,
        descripcion
    };
    await pool.query('UPDATE links set? WHERE id=?', [newLink,id]);
    req.flash('success','link actualizado correctamente');
    res.redirect('/links');
});

module.exports = router;