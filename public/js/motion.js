anime({
    targets: '.land-div h1 path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });

  anime({
    targets: '.land-btn',
    translateX: 100,
    direction: 'alternate',
    loop: false,
    easing: 'spring(1, 40, 40, 30)'
  })

  var tl = anime.timeline({
    easing: 'easeOutExpo',
    loop: true,
    duration: 400,
  });
  
  tl
  .add({
    targets: '.one',
    opacity: 0.4,
  })
  .add({
    targets: '.two',
    opacity: 0.4,
  }) // relative offset
  .add({
    targets: '.three',
    opacity: 0.4,
  });

  anime({
    targets: '.dot-one, .one, .two',
    translateY: 250,
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate',
    duration: 4000,
    opacity: 0.16,
  });

  anime ({
    targets: '#blobby',
    skewX: 20,
    rotate: 360,
    loop: true,
    easing: 'easeInOutSine',
    direction: 'alternate',
    duration: 4000,
  })