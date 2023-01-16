//Gsap library
const timeline = gsap.timeline({ defaults: { duration: 0.5, opacity: 0 } });
//Typewriter library
const el = document.querySelector('.p__animate');
//Obeserver API variables
const nav = document.querySelector('nav');
const navHeight = nav.getBoundingClientRect().height;
const allSections = document.querySelectorAll('.section');
const items = document.querySelectorAll('.nav__el');
const counters = document.querySelectorAll('.skill__counter');

//GSAP////////////////////////////////////////////////////////////////////////////

timeline
  .from('.two', { y: '-400px' })
  .from('.home__title', { x: '400px' }, '<0.3')
  .from('.home__title2', { x: '-400px' }, '<0')
  .from('.home__socials', { x: '400px' }, '<0')
  .from('.home__social', { stagger: 0.5, duration: 0.4 })
  .from('.buttons', { x: '400px' });

const writerObj = {
  loop: true,
  delay: 40,
};

//TYPEWRITER////////////////////////////////////////////////////////////////////////////
let typewriter = new Typewriter(el, writerObj);

typewriter
  .pauseFor(2500)
  .typeString('Looking for exciting opportunities to put my skills to use!')
  .pauseFor(200)
  .start();

//INTERSECTION OBSERVER/////////////////////////////////////////////////////////////////

const obsCallBack = (entries, observer) => {
  entries.forEach(entry => {
    const lastEntry = entry.target.id;
    if (!entry.isIntersecting) return;

    /////// ADDING ACTIVE CLASS TO NAV ITEMS//////////////////////////////////////////////
    //Removing from NAV ITEMS ACTIVE STATUS
    items.forEach(item => item.classList.remove('active'));

    console.log(lastEntry);
    console.log(entry.target.id);
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
const obsOptions = {
  root: null,
  threshold: 0.25,
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);

allSections.forEach(section => {
  observer.observe(section);
});

// ----------------------------- TOGGLING STICKY CLASS FOR NAVIGATION BAR ------------------------------------------//

const navCallBack = entries => {
  const entry = entries[0];
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navObserver = new IntersectionObserver(navCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navObserver.observe(home);

///////////////////////////////////////////////////////////////SKILL SECTION ICONS HOVER//////////////////////////////////////////////

const contentBox = document.querySelectorAll('.content__box');

contentBox.forEach(box => {
  box.addEventListener('mouseenter', e => {
    const image = e.target.querySelector('.content__icon');
    image.src = `./img/skills/${image.alt}-color.svg`;
    box.addEventListener('mouseleave', e => {
      image.src = `./img/skills/${image.alt}.svg`;
    });
  });
});

/////////////////////////////////OPENING MENU//////////////////////////////////////////////////////////
const menutBtn = document.getElementById('menu__icon');
const navigationList = document.querySelector('.navigation');

menutBtn.addEventListener('click', () => {
  navigationList.classList.toggle('open');
  menutBtn.classList.toggle('bx-x');
});

window.addEventListener('scroll', () => {
  menutBtn.classList.remove('bx-x');
  navigationList.classList.remove('open');
});

/////////////////////////////////SOCIALS after//////////////////////////////////////////////////////////
const homeSocials = document.querySelectorAll('.home__social');
const line = document.querySelector('.social__after');

homeSocials.forEach(btn => {
  ['mouseenter', 'mouseleave'].forEach(event => {
    btn.addEventListener(event, () => line.classList.toggle('position'));
  });
});

//CAROUSEL MOVING// IN SKILL SECTION//

// const carouselMovement = () => {
//   const carousel = document.querySelector('.skills__carousel');
//   const list = document.querySelector('.skills__list');
//   let secondList;

//   const speed = 1;
//   const width = list.offsetWidth;

//   let decrement = 0;
//   let secondDecrement = width;

//   function clone() {
//     secondList = list.cloneNode(true);
//     carousel.appendChild(secondList);
//     secondList.style.left = `${width}px`;
//   }

//   function firstListMovement() {
//     decrement -= speed;

//     if (width >= Math.abs(decrement)) list.style.left = `${decrement}px`;
//     else decrement = width;
//   }

//   function secondListMovement() {
//     secondDecrement -= speed;
//     if (secondList.offsetWidth >= Math.abs(secondDecrement))
//       secondList.style.left = `${secondDecrement}px`;
//     else secondDecrement = width;
//   }

//   clone();

//   let aMove = setInterval(firstListMovement, 20);
//   let bMove = setInterval(secondListMovement, 20);
// };

// carouselMovement();
