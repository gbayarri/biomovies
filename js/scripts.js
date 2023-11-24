/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', async(event) => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
            document.getElementById("logo-navbar").classList.add('display-none')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
            document.getElementById("logo-navbar").classList.remove('display-none')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // footer date
    document.getElementById("year").innerHTML = new Date().getFullYear();

    let latest_version
    fetch('https://api.github.com/repos/gbayarri/biomovies-app/releases')
    .then(res => res.json())
    .then(json => {

        // get latest version
        latest_version = json[0].tag_name.replace('v', '')
        document.querySelectorAll(".version").forEach(item => item.innerHTML = latest_version)

        // get latest
        const latest_release = json.filter(item => item.tag_name === `v${latest_version}`)[0]

        // get release version name
        let versionName
        if(latest_release.body.indexOf('Pre-alpha') !== -1) versionName = 'Pre-alpha'
		else if(latest_release.body.indexOf('Alpha') !== -1) versionName = 'Alpha'
        else if(latest_release.body.indexOf('Beta') !== -1) versionName = 'Beta'
        else if(latest_release.body.indexOf('Release') !== -1) versionName = 'Release'
        else versionName = 'Unknown'		

        document.querySelectorAll(".versionName").forEach(item => item.innerHTML = versionName)

        const assets = latest_release.assets
        assets.forEach(item => {
            if(item.name.indexOf('dmg') !== -1 && item.name.indexOf('arm64') !== -1) {
                document.getElementById("dropdownMenuButtonApple").classList.remove("disabled")
                document.getElementById("arm64-dmg").classList.remove("disabled")
                document.getElementById("arm64-dmg").setAttribute('href', item.browser_download_url);
            }
            if(item.name.indexOf('dmg') !== -1 && item.name.indexOf('arm64') === -1) {
                document.getElementById("dropdownMenuButtonApple").classList.remove("disabled")
                document.getElementById("intel-dmg").classList.remove("disabled")
                document.getElementById("intel-dmg").setAttribute('href', item.browser_download_url);
            }
            if(item.name.indexOf('exe') !== -1) {
                document.getElementById("dropdownMenuButtonWin").classList.remove("disabled")
                document.getElementById("exe").classList.remove("disabled")
                document.getElementById("exe").setAttribute('href', item.browser_download_url);
            }
            if(item.name.indexOf('deb') !== -1) {
                document.getElementById("dropdownMenuButtonUbuntu").classList.remove("disabled")
                document.getElementById("amd64-deb").classList.remove("disabled")
                document.getElementById("amd64-deb").setAttribute('href', item.browser_download_url);
            }
            if(item.name.indexOf('AppImage') !== -1) {
                document.getElementById("dropdownMenuButtonUbuntu").classList.remove("disabled")
                document.getElementById("amd64-appimage").classList.remove("disabled")
                document.getElementById("amd64-appimage").setAttribute('href', item.browser_download_url);
            }
        })

        const old_releases = json.filter(item => item.tag_name !== `v${latest_version}`)

        const selectReleases = document.getElementById("select-releases")
        // fill select with release name and date
        old_releases.forEach(item => {
            //const d = new Date(item.published_at)
            let publish_date

            const body = item.body.split('\r\n')
            body.forEach((itm, index) => { if(itm.length && itm.indexOf('[') !== -1 && itm.indexOf(']') !== -1) publish_date = itm.replace(/\[/g, '').replace(/\]/g, '') })

            //const publish_date = `${(d.getDate() < 10 ? '0' : '') + d.getDate()}/${(d.getMonth() < 9 ? '0' : '') + (parseInt(d.getMonth()) + 1)}/${d.getFullYear()}`
            //selectReleases.options[selectReleases.options.length] = new Option(`${item.name} - ${publish_date}`, item.url);
            selectReleases.options[selectReleases.options.length] = new Option(`${item.name} - ${publish_date}`, item.tag_name);
            //selectReleases.options[selectReleases.options.length] = new Option(`${item.name}`, item.tag_name);
        })
        // add window action to each option
        selectReleases.addEventListener("change", (e) => {
            // disable all secondary buttons
            document.getElementById("arm64-dmg-sec").classList.add("disabled")
            document.getElementById("intel-dmg-sec").classList.add("disabled")
            document.getElementById("exe-sec").classList.add("disabled")
            document.getElementById("amd64-deb-sec").classList.add("disabled")
            document.getElementById("amd64-appimage-sec").classList.add("disabled")
            document.getElementById("dropdownMenuButtonAppleSec").classList.add("disabled")
            document.getElementById("dropdownMenuButtonUbuntuSec").classList.add("disabled")
            document.getElementById("dropdownMenuButtonWinSec").classList.add("disabled")
            if(selectReleases.value) {
                // show secondary buttons and enable / add links if necessary
                document.getElementById("sec-assets").style.display = "flex"
                var sec_assets = old_releases.filter(item => item.tag_name === selectReleases.value)[0].assets
                sec_assets.forEach(item => {
                    if(item.name.indexOf('dmg') !== -1 && item.name.indexOf('arm64') !== -1) {
                        document.getElementById("dropdownMenuButtonAppleSec").classList.remove("disabled")
                        document.getElementById("arm64-dmg-sec").classList.remove("disabled")
                        document.getElementById("arm64-dmg-sec").setAttribute('href', item.browser_download_url);
                    }
                    if(item.name.indexOf('dmg') !== -1 && item.name.indexOf('arm64') === -1) {
                        document.getElementById("dropdownMenuButtonAppleSec").classList.remove("disabled")
                        document.getElementById("intel-dmg-sec").classList.remove("disabled")
                        document.getElementById("intel-dmg-sec").setAttribute('href', item.browser_download_url);
                    }
                    if(item.name.indexOf('exe') !== -1) {
                        document.getElementById("dropdownMenuButtonWinSec").classList.remove("disabled")
                        document.getElementById("exe-sec").classList.remove("disabled")
                        document.getElementById("exe-sec").setAttribute('href', item.browser_download_url);
                    }
                    if(item.name.indexOf('deb') !== -1) {
                        document.getElementById("dropdownMenuButtonUbuntuSec").classList.remove("disabled")
                        document.getElementById("amd64-deb-sec").classList.remove("disabled")
                        document.getElementById("amd64-deb-sec").setAttribute('href', item.browser_download_url);
                    }
                    if(item.name.indexOf('AppImage') !== -1) {
                        document.getElementById("dropdownMenuButtonUbuntuSec").classList.remove("disabled")
                        document.getElementById("amd64-appimage-sec").classList.remove("disabled")
                        document.getElementById("amd64-appimage-sec").setAttribute('href', item.browser_download_url);
                    }
                })
            } else document.getElementById("sec-assets").style.display = "none"
        }, false);
        // enable select
        selectReleases.disabled = false
    })

    // back to top
    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

});
