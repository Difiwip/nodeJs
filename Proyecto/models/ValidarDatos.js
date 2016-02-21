function validar(User,req,res){
	User.findOne({nick: req.body.nick, password: req.body.password},function(err,doc){
			if (doc) {
				res.send("esta bien");
			}
			else {
				res.send("esta mal");
			}
		});
}