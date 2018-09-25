import "./stylesheets/main.scss";
import "./images/logo.png"
import "./images/carbo.png"
import "./images/pizza.png"
import "./images/02.png"

import anime from 'animejs'

const firstAnimation = () => {

  anime({
    targets: '.container_banner-animation-1-carbonara',
    rotate: {
      value: '1turn',
      duration: 30000,
      easing: 'linear'
    },
    opacity: [
      {value: 0, delay: 1000, easing: 'easeInCubic'}
    ]
  })

  // text
  anime({
    targets: '.container_banner-animation-1-text',
    delay: 500,
    opacity: [
      {value: 1, duration: 0},
      {value: 0, duration: 166},
      {value: 1, duration: 166},
      {value: 0, duration: 166},
      {value: 1, duration: 166},
      {value: 0, duration: 166},
      {value: 1, duration: 166},
    ],
    easing: 'easeInCubic',
    complete: function () {
      // logo opacity 0
      anime({
        targets: '.container_banner-animation-1-logo',
        opacity: [
          {value: 0, duration: 250},
        ],
        easing: 'easeInCubic',
        complete: function () {
          // offre spéciale reduce font size and translateY
         anime({
          targets: '.container_banner-animation-1-text',
          translateY: [
            {value: '-60px', duration: 500}
          ],
          fontSize: [
            {value: '26px', duration: 500}
          ],
          easing: 'easeInCubic',
          complete: function () {

            anime.remove('.container_banner-animation-1-carbonara');

            anime({
              targets: '.container_banner-animation-2-img',
              opacity: 1,
              easing: 'easeOutCubic',
              duration: 500
            })

            anime({
              targets: '.container_banner-animation-3-conditions',
              opacity: 1,
              easing: 'easeOutCubic',
              duration: 500,
              complete: function () {

                anime({
                  targets: '.container_banner-animation-2-img',
                  opacity: 0,
                  easing: 'easeOutCubic',
                  duration: 500,
                  delay: 1500,
                  complete: function () {

                    anime({
                      targets: '.container_banner-animation-3-text',
                      opacity: 1,
                      easing: 'easeInCubic',
                      duration: 500,
                      complete: function () {
                        anime({
                          targets: '.container_banner-animation-3-text',
                          opacity: 0,
                          easing: 'easeInCubic',
                          duration: 500,
                          delay: 1500,
                        })

                        anime({
                          targets: '.container_banner-animation-3-conditions',
                          opacity: 0,
                          easing: 'easeInCubic',
                          duration: 500,
                          delay: 1500,
                          complete: function () {

                            anime({
                              targets: '.container_banner-animation-1-text',
                              opacity: 0,
                              easing: 'easeInCubic',
                              duration: 500,
                              complete: function () {

                                anime({
                                  targets: '.container_banner-animation-1-logo',
                                  opacity: 1,
                                  easing: 'easeInCubic',
                                  duration: 500
                                })

                                anime({
                                  targets: '.container_banner-animation-4-pizza',
                                  opacity: 1,
                                  easing: 'easeInCubic',
                                  duration: 500
                                })

                                anime({
                                  targets: '.container_banner-animation-4-button',
                                  opacity: 1,
                                  easing: 'easeInCubic',
                                  duration: 500,
                                  complete: function () {

                                    anime({
                                      targets: '.container_banner-animation-4-button',
                                      easing: 'easeInCubic',
                                      duration: 500,
                                      scaleX: [
                                        {value: 1, duration: 166},
                                        {value: 1.05, duration: 166},
                                        {value: 1, duration: 166}
                                      ],
                                      scaleY: [
                                        {value: 1, duration: 166},
                                        {value: 1.05, duration: 166},
                                        {value: 1, duration: 166}
                                      ],
                                      scaleZ: [
                                        {value: 1, duration: 166},
                                        {value: 1.05, duration: 166},
                                        {value: 1, duration: 166}
                                      ],
                                    })
                                  }
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
         })
        }
      })
    }
  })
}

firstAnimation()