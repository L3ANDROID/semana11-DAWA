let db = require('../models/dbconexion');

var fs = require('fs')

let productos = {
    listar(req, res) {
        let sql = "SELECT * FROM productos";
        db.query(sql, function(err, result) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json(result);
            }
        });
    },
    store(req, res) {
        try{
            let tmp_path = req.files.uploads[0].path;
            let target_path = './public/images/'+req.files.uploads[0].originalFilename;
        
            fs.rename(tmp_path, target_path, function(err){
                if(err) throw err;
                fs.unlink(tmp_path, function(){
                    if(err) throw err
                });
            });
        }catch(err){
            console.log(err)
        }

        val_nombre = req.body.descripcion;
        val_precio = req.body.precio;
        val_imagen = req.files.uploads[0].originalFilename;

        let sql = "INSERT INTO productos(descripcion, precio, imagen) VALUES(?,?,?)";
        db.query(sql, [val_nombre, val_precio, val_imagen], function(err, newData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json(newData);
            }
        });
    },
    show(req, res) {
        val_id = req.params.id;
        let sql = "SELECT * FROM productos WHERE codigo=?";
        db.query(sql, [val_id], function(err, rowData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json(rowData);
            }
        });
    },
    edit(req, res) {
        val_id = req.body.codigo;
        val_nombre = req.body.descripcion;
        val_precio = req.body.precio;
        console.log(req.body)
        let sql = "UPDATE productos SET descripcion=?, precio=? WHERE codigo=?";
        db.query(sql, [val_nombre, val_precio, val_id], function(err, newData) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(newData);
            }
        });
    },
    delete(req, res) {
        console.log(req.params)
        val_id = req.params.id;
        let sql = "DELETE FROM productos WHERE codigo=?";
        db.query(sql, [val_id], function(err, newData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    }
}

module.exports = productos;