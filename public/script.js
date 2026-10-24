(() => {
  "use strict";


  /* ========================================
     STATE
  ======================================== */

  const observedAnimations =
    new WeakSet();

  let animationObserver =
    null;


  /* ========================================
     FIND ELEMENTS
  ======================================== */

  function findElements(
    root,
    selector
  ) {
    const elements = [];


    if (
      root instanceof Element &&
      root.matches(selector)
    ) {
      elements.push(root);
    }


    if (
      root.querySelectorAll
    ) {
      elements.push(
        ...root.querySelectorAll(
          selector
        )
      );
    }


    return elements;
  }


  /* ========================================
     MOBILE MENU
  ======================================== */

  function getNavForToggle(
    toggle
  ) {
    const header =
      toggle.closest(
        "header"
      );


    return (
      header?.querySelector(
        "nav"
      ) ||
      document.querySelector(
        "nav"
      )
    );
  }


  function setMenuState(
    toggle,
    nav,
    isOpen
  ) {
    nav.classList.toggle(
      "active",
      isOpen
    );


    toggle.setAttribute(
      "aria-expanded",
      String(
        isOpen
      )
    );
  }


  function closeAllMenus() {
    document
      .querySelectorAll(
        ".menu-toggle"
      )
      .forEach(
        (
          toggle
        ) => {
          const nav =
            getNavForToggle(
              toggle
            );


          if (
            nav
          ) {
            setMenuState(
              toggle,
              nav,
              false
            );
          }
        }
      );
  }


  /* ========================================
     MENU CLICK
  ======================================== */

  document.addEventListener(
    "click",
    (
      event
    ) => {
      const target =
        event.target;


      if (
        !(
          target instanceof
          Element
        )
      ) {
        return;
      }


      /* TOGGLE */

      const toggle =
        target.closest(
          ".menu-toggle"
        );


      if (
        toggle
      ) {
        const nav =
          getNavForToggle(
            toggle
          );


        if (
          !nav
        ) {
          return;
        }


        event.preventDefault();


        const isOpen =
          nav.classList.contains(
            "active"
          );


        setMenuState(
          toggle,
          nav,
          !isOpen
        );


        return;
      }


      /* NAVIGATION LINK */

      const navLink =
        target.closest(
          "nav a"
        );


      if (
        navLink
      ) {
        closeAllMenus();

        return;
      }


      /* OUTSIDE CLICK */

      document
        .querySelectorAll(
          ".menu-toggle"
        )
        .forEach(
          (
            menuToggle
          ) => {
            const nav =
              getNavForToggle(
                menuToggle
              );


            if (
              !nav ||
              !nav.classList.contains(
                "active"
              )
            ) {
              return;
            }


            if (
              !nav.contains(
                target
              ) &&
              !menuToggle.contains(
                target
              )
            ) {
              setMenuState(
                menuToggle,
                nav,
                false
              );
            }
          }
        );
    }
  );


  /* ========================================
     RESIZE
  ======================================== */

  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth >
        768
      ) {
        closeAllMenus();
      }
    },
    {
      passive:
        true,
    }
  );


  /* ========================================
     SCROLL ANIMATIONS
  ======================================== */

  function initScrollAnimations(
    root
  ) {
    const elements =
      findElements(
        root,
        ".animate"
      );


    if (
      !(
        "IntersectionObserver"
        in window
      )
    ) {
      elements.forEach(
        (
          element
        ) => {
          element.classList.add(
            "show"
          );
        }
      );


      return;
    }


    if (
      !animationObserver
    ) {
      animationObserver =
        new IntersectionObserver(
          (
            entries,
            observer
          ) => {
            entries.forEach(
              (
                entry
              ) => {
                if (
                  entry.isIntersecting
                ) {
                  entry.target.classList.add(
                    "show"
                  );


                  observer.unobserve(
                    entry.target
                  );
                }
              }
            );
          },
          {
            root:
              null,

            rootMargin:
              "0px 0px -80px 0px",

            threshold:
              0,
          }
        );
    }


    elements.forEach(
      (
        element
      ) => {
        if (
          observedAnimations.has(
            element
          ) ||
          element.classList.contains(
            "show"
          )
        ) {
          return;
        }


        observedAnimations.add(
          element
        );


        animationObserver.observe(
          element
        );
      }
    );
  }


  /* ========================================
     INITIALIZE
  ======================================== */

  function initialize() {
    document
      .querySelectorAll(
        ".menu-toggle"
      )
      .forEach(
        (
          toggle
        ) => {
          if (
            !toggle.hasAttribute(
              "aria-expanded"
            )
          ) {
            toggle.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        }
      );


    initScrollAnimations(
      document
    );
  }


  /* ========================================
     START
  ======================================== */

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      {
        once:
          true,
      }
    );
  } else {
    initialize();
  }
})();