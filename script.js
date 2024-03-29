//Gsap library
const timeline = gsap.timeline({ defaults: { duration: 0.5, opacity: 0 } });
//Typewriter library
const el = document.querySelector('.p__animate');
//Obeserver API variables
const nav = document.querySelector('nav');
const navHeight = nav.getBoundingClientRect().height;
const allSections = document.querySelectorAll('.section');
const items = document.querySelectorAll('.nav__el');
//
const counters = document.querySelectorAll('.skill__counter');
const contentBox = document.querySelectorAll('.content__box');
//
const menutBtn = document.getElementById('menu__icon');
const navigationList = document.querySelector('.navigation');
//
const homeSocials = document.querySelectorAll('.home__social');
const line = document.querySelector('.social__after');
//select mario
const marioAudio = document.querySelector('.mario__audio');
const marioPng = document.querySelector('.mario');

////Mario audio on hover - Fist element in the array is JS, where mario is
contentBox[0].addEventListener('mouseenter', e => {
  marioAudio.volume = 0.01;
  marioAudio.play();
  contentBox[0].addEventListener('mouseleave', () => {
    marioAudio.pause();
    marioAudio.currentTime = 0;
  });
});

/////////////// Observer functions //////////////////

//OBESRVER OF SECTIONS

const obsCallBack = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    /////// ADDING ACTIVE CLASS TO NAV ITEMS//////////////////////////////////////////////
    //Removing from NAV ITEMS ACTIVE STATUS
    items.forEach(item => item.classList.remove('active'));

    //ADDING TO NAV ITEMS ACTIVE STATUS
    document
      .querySelector(`.nav__el--${entry.target.id}`)
      .classList.add('active');

    ////////////////////////////////////////////// Changing HASH in adress bard //////////
    window.history.pushState(null, '_', `#${entry.target.id}`);

    //////////////AUTOMATIC JS COUNTER IN SKILL SECTION////////////////
    if (entry.target.id === 'skills') {
      counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
          const target = counter.getAttribute('data-target');
          const base = +counter.innerText;

          if (base < target) {
            counter.innerText = `${base + 1}`;
            setTimeout(updateCounter, 100);
          }
        };
        updateCounter();
      });
    }
    ////////////////////////////////////////////// SECTION LOAD ////////////
    entry.target.classList.remove('hidden');
  });
};

///////////////CODE/////////////////

//GSAP/////////////////////////////////////////

timeline
  .from('.two', { y: '-400px' })
  .from('.home__title', { x: '400px' }, '<0.3')
  .from('.home__title2', { x: '-400px' }, '<0')
  .from('.home__socials', { x: '400px' }, '<0')
  .from('.home__social', { stagger: 0.5, duration: 0.4 })
  .from('.buttons', { x: '400px' });

const writerObj = {
  loop: true,
  delay: 20,
};

//-----------------Typewriter----------------------------------//
let typewriter = new Typewriter(el, writerObj);

typewriter
  .pauseFor(2500)
  .typeString(" It's a great you stopped by.")
  .pauseFor(250)
  .deleteAll(20)
  .typeString('My portfolio is ready for you to explore.')
  .pauseFor(800)
  .deleteAll(20)
  .typeString('Make yourself comfortable and have fun!')
  .pauseFor(250)
  .start();

//--------------------INTERSECTION OBSERVER-----------------//
const obsOptions = {
  root: null,
  threshold: 0.15,
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);

allSections.forEach(section => {
  observer.observe(section);
});

// -----------------NAVIGATION BAR ON SCROLL---------------//

let previousScrollY = window.pageYOffset;

window.onscroll = () => {
  let currentScrolly = window.pageYOffset;

  (previousScrollY > currentScrolly && (nav.style.top = '0px')) ||
    (nav.style.top = '-100px');

  if (previousScrollY > 100) {
    nav.style.backgroundColor = 'transparent';
    nav.style.backdropFilter = 'blur(5px)';
  } else {
    nav.style.backgroundColor = 'transparent';
    nav.style.backdropFilter = 'blur(0)';
  }

  previousScrollY = currentScrolly;
};
//---------------Skill section: SKILL ICON COLORING-------------//

contentBox.forEach(box => {
  box.addEventListener('mouseenter', e => {
    const image = e.target.querySelector('.content__icon');
    image.src = `./img/skills/${image.alt}-color.svg`;
    image.style.transform = 'scale(1.4)';
    box.addEventListener('mouseleave', e => {
      image.src = `./img/skills/${image.alt}.svg`;
      image.style.transform = 'scale(1)';
    });
  });
});

//-----------------------TOGGLING NAVIGATION OPEN CLASS----------//
menutBtn.addEventListener('click', () => {
  navigationList.classList.toggle('open');
  menutBtn.classList.toggle('bx-x');

  //Nav bar color change
  (navigationList.classList.contains('open') &&
    (nav.style.backgroundColor = 'var(--bg-color)')) ||
    (nav.style.backgroundColor = 'transparent');
});

window.addEventListener('scroll', () => {
  menutBtn.classList.remove('bx-x');
  navigationList.classList.remove('open');
});

/////////////////////////////////SOCIALS after//////////////////////////////////////////////////////////

homeSocials.forEach(btn => {
  ['mouseenter', 'mouseleave'].forEach(event => {
    btn.addEventListener(event, () => line.classList.toggle('position'));
  });
});
