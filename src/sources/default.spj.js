import lang, { langs } from 'i18n/lang'
export default function(language) {
  let langList = language ? langs[language] : lang
  return {
    components: [
      {
        components: [
          {
            type: 'TextBox',
            x: 160,
            y: 174,
            text: `<p>&nbsp;<span style="font-size:26px"><span style="font-family:arial,helvetica,sans-serif">${langList.welcomeToSP}</span></span></p>\n\n<ul>\n\t<li><span style="font-size:26px"><span style="font-family:arial,helvetica,sans-serif">${langList.clickMeToSelect}</span></span></li>\n\t<li><span style="font-size:26px"><span style="font-family:arial,helvetica,sans-serif">${langList.orDoubleClickToEdit}</span></span></li>\n</ul>\n`,
            selected: false
          }
        ],
        type: 'Slide'
      },
      {
        components: [],
        type: 'Slide'
      },
      {
        components: [],
        type: 'Slide'
      },
      {
        components: [],
        type: 'Slide'
      }
    ],
    activeSlide: 0,
    slideWidth: 640,
    slideHeight: 480,
    perspective: 1024,
    style: {
      background:
        'radial-gradient(rgba(240, 240, 240, 0.85), rgb(190, 190, 190))'
    },
    defaultSlideStyle: {
      background:
        'radial-gradient(rgba(240, 240, 240, 0.85), rgb(190, 190, 190))'
    }
  }
}
