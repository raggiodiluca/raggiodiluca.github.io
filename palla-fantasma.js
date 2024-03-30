window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const vh = window.innerHeight;
    const triggerPoint = vh;
  
      const progress = scrollTop / triggerPoint;
      const leftPosition = 100 * (1 - (progress/1.7)) + '%'; /* Calculate left based on scroll progress */
      document.querySelector('.door-mask .sphere').style.left = leftPosition;
  });


  window.addEventListener('scroll', function() {
    const sphere = document.querySelector('.droor-mask .sphere');
    const sphereRect = sphere.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const vh = window.innerHeight;
    const triggerPoint = vh;
  
    // Calculate the position of the sphere relative to the viewport
    const sphereTop = sphereRect.top + scrollTop;
  
    // Check if the top of the sphere is within the viewport
    if (sphereTop < (scrollTop + vh)) {
        // Sphere is entering the viewport
        let progress = (scrollTop - sphereTop + vh) / triggerPoint;
        progress = Math.min(progress, 1); // Ensure progress doesn't exceed 1
        const leftPosition = 'calc(' + Math.min(50 * (progress / .8), 50) + '% - 1rem)'; /* Calculate left based on scroll progress, limited to 50% */
        console.log(leftPosition);
        sphere.style.left = leftPosition;
    }
});

