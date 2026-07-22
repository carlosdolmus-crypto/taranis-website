/**
 * Taranis Resources Homepage Interaction Script
 * Handles sticky header, mobile nav, interactive maps, scroll-driven storytelling, 
 * target coordination, and timeline filters.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MOBILE NAVIGATION & SCROLL HEADER
    // ==========================================================================
    const header = document.getElementById('header');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('active'); // CSS Hamburger styling
        });
    }

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavToggle && navMenu) {
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            }
        });
    });

    // ==========================================================================
    // 2. SECTION 2: INTERACTIVE DISTRICT MAP TARGETS (Button-Based)
    // ==========================================================================
    const targetButtons = document.querySelectorAll('.map-target-btn');
    const targetPanes = document.querySelectorAll('.target-info-pane');

    targetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Toggle active button
            targetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active info pane with ambient transition
            targetPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === targetId) {
                    pane.classList.add('active');
                    // Ambient glow pulse on transition
                    pane.style.boxShadow = 'inset 0 0 30px rgba(200, 154, 74, 0.06)';
                    setTimeout(() => {
                        pane.style.boxShadow = '';
                    }, 600);
                }
            });
        });
    });

    // ==========================================================================
    // 3. SECTION 4: MAGMATIC ENGINE SCROLL REVEAL (Apple-Style Storytelling)
    // ==========================================================================
    const stickyContainer = document.querySelector('.elephant-sticky-container');
    const modelLayers = {
        thor: document.getElementById('layer-thor'),
        tusks: document.getElementById('layer-tusks'),
        i1: document.getElementById('layer-i1'),
        plumbing: document.getElementById('layer-plumbing')
    };
    const narrativeSteps = document.querySelectorAll('.narrative-step');

    // Only run the scroll-driven logic on desktop (viewport width > 1024px)
    // On tablet and mobile, we show all elements statically as per our CSS
    const handleScrollReveal = () => {
        if (window.innerWidth <= 1024 || !stickyContainer) return;

        const rect = stickyContainer.getBoundingClientRect();
        const containerHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate how far we've scrolled down the container (0 to 1)
        const scrollRange = containerHeight - viewportHeight;
        let scrollPercent = -rect.top / scrollRange;
        
        // Clamp value between 0 and 1
        scrollPercent = Math.max(0, Math.min(1, scrollPercent));
        
        let currentStep = 1;
        
        // Split the scroll duration into 4 zones
        if (scrollPercent < 0.25) {
            currentStep = 1;
        } else if (scrollPercent >= 0.25 && scrollPercent < 0.50) {
            currentStep = 2;
        } else if (scrollPercent >= 0.50 && scrollPercent < 0.75) {
            currentStep = 3;
        } else {
            currentStep = 4;
        }
        
        // Update Narrative Steps
        narrativeSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update HUD Tracker (Dynamic Progress & Text Highlighting)
        const hudIndicators = document.querySelectorAll('.hud-step-indicator');
        const hudFill = document.querySelector('.hud-progress-bar-fill');
        if (hudFill) {
            hudFill.style.width = `${currentStep * 25}%`;
        }
        hudIndicators.forEach((ind, index) => {
            if (index + 1 === currentStep) {
                ind.style.color = 'var(--color-accent-gold)';
                ind.style.opacity = '1';
            } else {
                ind.style.color = 'rgba(255, 255, 255, 0.3)';
            }
        });
        
        // Update Geological Layers and Background Image
        const mountainBgImg = document.querySelector('.mountain-bg-img');
        if (currentStep === 1) {
            modelLayers.thor?.classList.add('active');
            modelLayers.tusks?.classList.remove('active');
            modelLayers.i1?.classList.remove('active');
            modelLayers.plumbing?.classList.remove('active');
            if (mountainBgImg) {
                mountainBgImg.style.backgroundImage = "linear-gradient(rgba(26, 28, 32, 0.4), rgba(26, 28, 32, 0.9)), url('./epithermal%20deposit.jpg')";
            }
        } else if (currentStep === 2) {
            modelLayers.thor?.classList.add('active');
            modelLayers.tusks?.classList.add('active');
            modelLayers.i1?.classList.remove('active');
            modelLayers.plumbing?.classList.remove('active');
            if (mountainBgImg) {
                mountainBgImg.style.backgroundImage = "linear-gradient(rgba(26, 28, 32, 0.4), rgba(26, 28, 32, 0.9)), url('./epithermal%20deposit.jpg')";
            }
        } else if (currentStep === 3) {
            modelLayers.thor?.classList.add('active');
            modelLayers.tusks?.classList.add('active');
            modelLayers.i1?.classList.add('active');
            modelLayers.plumbing?.classList.remove('active');
            if (mountainBgImg) {
                mountainBgImg.style.backgroundImage = "linear-gradient(rgba(26, 28, 32, 0.4), rgba(26, 28, 32, 0.9)), url('./epithermal%20deposit.jpg')";
            }
        } else if (currentStep === 4) {
            modelLayers.thor?.classList.add('active');
            modelLayers.tusks?.classList.add('active');
            modelLayers.i1?.classList.add('active');
            modelLayers.plumbing?.classList.add('active');
            if (mountainBgImg) {
                mountainBgImg.style.backgroundImage = "linear-gradient(rgba(26, 28, 32, 0.4), rgba(26, 28, 32, 0.9)), url('./epithermal%20deposit.jpg')";
            }
        }
    };

    window.addEventListener('scroll', handleScrollReveal);
    window.addEventListener('resize', handleScrollReveal);

    // ==========================================================================
    // 4. SECTION 6: DISTRICT-SCALE TARGET COORDINATOR
    // ==========================================================================
    const upsideCards = document.querySelectorAll('.upside-card');
    const focusedName = document.getElementById('focused-target-name');
    const focusedStatus = document.getElementById('focused-target-status');
    
    // Coordinates and details mapping for cards
    const targetData = [
        { name: "THOR DEPOSIT", coord: "COORD: 50.672° N, 117.654° W", status: "ACTIVE RESOURCE TARGET" },
        { name: "BORR ANOMALY", coord: "COORD: 50.684° N, 117.671° W", status: "HIGH-PRIORITY DRILL TARGET" },
        { name: "NORTRAN VEINS", coord: "COORD: 50.695° N, 117.685° W", status: "RESOURCE EXPANSION ZONE" },
        { name: "RAM FRONTIER", coord: "COORD: 50.712° N, 117.708° W", status: "VMS DEPOSIT SIGNATURE" },
        { name: "ONE O'CLOCK DOME", coord: "COORD: 50.661° N, 117.632° W", status: "UNTESTED ALTERATION HALO" }
    ];

    upsideCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Toggle active card styling
            upsideCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Update Coordinate Visuals
            const data = targetData[index];
            if (!data || !focusedName || !focusedStatus) return;

            focusedName.textContent = data.name;
            focusedStatus.textContent = data.status;
            
            // Update displayed coordinates text
            const coordSpan = document.querySelector('.target-coord');
            if (coordSpan) {
                coordSpan.textContent = data.coord;
            }
            
            // Trigger target focus bracket micro-animation
            const targetContainer = document.querySelector('.target-focus-container');
            targetContainer.style.transform = 'scale(1.05)';
            setTimeout(() => {
                targetContainer.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // ==========================================================================
    // 5. SECTION 8: CATALYST TIMELINE FILTER
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Toggle active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter timeline items
            timelineItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    item.classList.add('active');
                } else if (item.classList.contains(filterValue)) {
                    item.classList.remove('hidden');
                    item.classList.add('active');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('active');
                }
            });
            
            // Adjust the vertical progress line height dynamically based on visible items
            adjustTimelineProgressLine();
        });
    });

    const adjustTimelineProgressLine = () => {
        const progressLine = document.querySelector('.timeline-progress-line');
        const visibleItems = document.querySelectorAll('.timeline-item:not(.hidden)');
        
        if (visibleItems.length > 0 && progressLine) {
            const firstDot = visibleItems[0].querySelector('.timeline-dot');
            const lastDot = visibleItems[visibleItems.length - 1].querySelector('.timeline-dot');
            
            if (firstDot && lastDot) {
                const startOffset = firstDot.getBoundingClientRect().top - progressLine.getBoundingClientRect().top;
                const endOffset = lastDot.getBoundingClientRect().top - progressLine.getBoundingClientRect().top;
                
                // Adjust position
                progressLine.style.top = `${startOffset + 6}px`;
                progressLine.style.height = `${endOffset - startOffset}px`;
            }
        }
    };

    // Initialize line adjustment on load and window resize
    window.addEventListener('resize', adjustTimelineProgressLine);
    setTimeout(adjustTimelineProgressLine, 500); // Wait for fonts/layout to settle

    // ==========================================================================
    // 6. HERO RIGHT-SIDE BOX: 51-FRAME ANIMATED PLAYER (6.0S LOOP)
    // ==========================================================================
    const frameViewer = document.getElementById('hero-frame-viewer');
    if (frameViewer) {
        const totalFrames = 51;
        const animationDuration = 6000; // 6 seconds
        const frameInterval = animationDuration / totalFrames; // ~117.6ms per frame
        const preloadedFrames = [];
        let currentFrame = 1;

        // Eagerly pre-load all 51 images to ensure smooth, flicker-free rendering
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, '0');
            img.src = `./images%20from%20the%20video/ezgif-frame-${frameNum}.jpg`;
            preloadedFrames.push(img);
        }

        // Cycle the frames at the calculated interval
        setInterval(() => {
            currentFrame = (currentFrame % totalFrames) + 1;
            const frameNum = String(currentFrame).padStart(3, '0');
            frameViewer.src = `./images%20from%20the%20video/ezgif-frame-${frameNum}.jpg`;
        }, frameInterval);
    }

});
