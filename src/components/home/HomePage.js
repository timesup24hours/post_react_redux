import React, { Component } from 'react'
import { connect } from 'react-redux'
//components
import HomeImg from './HomeImg'
import SectionBird from './SectionBird'
// import SectionFullWidthImg from './SectionFullWidthImg'
import SectionParagraph from './SectionParagraph'
import SectionModel from './SectionModel'
import SectionScope from './SectionScope'
import SectionFloating from './SectionFloating'
import HorizontalScroll from './HorizontalScroll'
import Footer from './Footer'


class HomePage extends Component {

  render() {
    return (
      <div className='HomePage-container'>
        <HomeImg />
        <div ref='HomePageContent' className='HomePage-content'>
          <SectionParagraph title='别BB' />
          <SectionBird />
          <SectionParagraph title='看不懂吧' />
          <SectionScope />
          <SectionParagraph title='看不懂吧' />
          <SectionFloating />
          <SectionParagraph title='看不懂吧' />
          <SectionModel />
          <SectionParagraph title='看不懂吧' />
          <HorizontalScroll posts={this.props.posts} />
          <SectionParagraph title='看不懂吧' />
          <SectionParagraph title='看不懂吧' />
          <Footer />
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

  // <SectionParagraph title='别BB' />
  // <SectionOne />
  // <SectionThree title='别BB' />
  // <sectionFullWidthImg />
  // <SectionParagraph title='别BB' />
  // <SectionParagraph title='别BB' />

// const smoothScroll = function(target) {
//     var scrollContainer = target;
//     do { //find scroll container
//         scrollContainer = scrollContainer.parentNode;
//         if (!scrollContainer) return;
//         scrollContainer.scrollTop += 1;
//     } while (scrollContainer.scrollTop == 0);
//
//     var targetY = 0;
//     do { //find the top of target relatively to the container
//         if (target == scrollContainer) break;
//         targetY += target.offsetTop;
//     } while (target = target.offsetParent);
//
//     scroll = function(c, a, b, i) {
//         i++; if (i > 30) return;
//         c.scrollTop = a + (b - a) / 30 * i;
//         setTimeout(function(){ scroll(c, a, b, i); }, 20);
//     }
//     // start scrolling
//     scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
// }
