App.LoginController = Ember.Controller.extend({
   isLoggedIn : false,

    actions: {
        'login': function() {

            this.set('isLoggedIn', true);
            $.getJSON("http://localhost:8000/auth/google/callback",function(result){
                console.log("json received");
             });

            // // Proprogate to parent controller
            // return true;
        }
    }
});