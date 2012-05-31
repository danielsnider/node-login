
$(document).ready(function(){
	
	var lv = new LoginValidator();
	var lc = new LoginController();

// main login form //

	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return lv.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
            lv.showLoginError('Login Failure', 'Please check your username and/or password');
		}
	}); 
	$('#user-tf').focus();
	
// login retrieval form via email //	
	
	var ev = new EmailValidator();	
	
	$('#retrieve-password-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("<b> Error!</b> Please enter a valid email address");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			ev.showEmailSuccess("You've been sent an email with your login credentials.");
		},
		error : function(){
			ev.showEmailAlert("I'm Sorry. I could not find that email address");
		}
	});
	
})