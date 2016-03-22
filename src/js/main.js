(function(){
	var menuButton = document.querySelector('.btn-nav');
	var menuNav = document.querySelector('.main-nav');
	var closeButton = document.querySelector('.btn-close');


	menuButton.addEventListener('click', openMenu);

	menuNav.addEventListener('click', closeMenu);

	closeButton.addEventListener('click', closeMenu);

	function openMenu (){
		menuNav.className="main-nav is-visible";
	}

	function closeMenu(e){
		if(e.target === this) {
			//console.log(e.target);
			//console.log('the click outside works');
			menuNav.className = "main-nav"
		}
	}
	
})()




