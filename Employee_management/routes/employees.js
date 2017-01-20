exports.list=function(req,res){
    req.getConnection(function(){connection.query('Select * from employees',function(err,rows){
        res.render('employees',{page_title:"",data:rows});
    })})
}
exports.add=function(req,res){
    res.render('add_employees',{page_title:""});

}
exports.edit=function(req,res) {
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query('Select * from employees where id=?', [id], function (err, rows) {
            if (err)
                console.log("Error selecting:%s", err);
            res.render('edit_customer', {page_title: "", data: rows})
        });
    })
    res.render('employees',{page_title:""});

}
exports.save=function(req,res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data={
        id:input.id,
            name:input.name,
            location:input.location
        };
        var query = connection.query("INSERT INTO employee set ? ",data, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            res.redirect('/employees');

        });

    //res.render('employees',{page_title:""});

});
}
exports.save_edit=function(req,res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var data = {
            id: input.id,
            name: input.name,
            location: input.location
        };
        connection.query("UPDATE employees set ? WHERE id = ? ", [data, id], function (err, rows) {

            if (err)
                console.log("Error Updating : %s ", err);

            res.redirect('/employees');

        });

        //res.render('employees',{page_title:""});

    });
}