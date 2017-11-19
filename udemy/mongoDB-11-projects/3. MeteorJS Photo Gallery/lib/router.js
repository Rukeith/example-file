Router.configure({ layoutTemplate: 'layout' });

Router.map(function() {
  this.route('photos', {
    path:'/',
    template:'photos'
  });

  this.route('addphotos', {
    path:'/add',
    template:'addphotos'
  });

  this.route('photo', {
    path: '/photos/:_id',
    template: 'photo',
    data: function() {
      return {
        photo: Photos.findOne({ _id: this.params._id })
      };
    }
  });
});
