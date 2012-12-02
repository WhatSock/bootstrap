/*!
Configure specific controls using the triggering element ID and matching AccDC Object ID
*/

(function(){
	// Get a reference for the AccDC Object that matches the triggering element's ID
	var dc = $A.reg.modalId; // for the Login form

	if (dc){
		$A.bind('#lbForm', 'submit', function(ev){
			if (!this.uname.value){
				alert('Woops! You forgot your username...');
				this.uname.focus();
			}

			else if (!this.pass.value){
				alert('Woops! You forgot your password...');
				this.pass.focus();
			}

			else{
				alert('WOW!');
				dc.close();
			}
			ev.preventDefault();
		});
	}
})();