{
    class ProfileController{
        constructor(){
            this.tabs = [
                {
                    active: 'active',
                    state: 'profile.info',
                },
                {
                    active: '',
                    state: 'profile.edit',
                },
            ];
        }    

        tabClicked(clickedTab){
            this.tabs.forEach(tab => {
                tab.active = '';
            });

            clickedTab.active = 'active';
        }
    }

    angular.module('meganote.profile')
        .controller('ProfileController', ProfileController);
}
