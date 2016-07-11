{
    class ProfileController{
        constructor(){
            this.tabs = [
                {
                    active: 'active',
                    state: 'profile.info',
                    innerText: 'Info',
                },
                {
                    active: '',
                    state: 'profile.edit',
                    innerText: 'Edit',
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
