import React from 'react';

import './DevelopmentNotes.scss';

import sketchOne400 from '../../assets/images/layout-sketch-page-one-400w.jpg';
import sketchOne640 from '../../assets/images/layout-sketch-page-one-640w.jpg';
import sketchTwo400 from '../../assets/images/layout-sketch-page-two-400w.jpg';
import sketchTwo640 from '../../assets/images/layout-sketch-page-two-640w.jpg';

function DevelopmentNotes() {
  return (
    <div id='development-notes'>
      <h2>Development sketches and notes</h2>
      <p>
        I wanted to document my original concept sketches and thoughts on this
        project scanned out of my notebookd. I thought it might be helpful to
        have available for reference later if I ever need it.
      </p>
      <figure>
        <img
          srcSet={sketchOne400 + ' 400w, ' + sketchOne640 + ' 640w '}
          sizes='(max-width: 768px) 100vw,
                        800px'
          src={sketchOne640}
          alt='pencil sketches of layouts and ideas for this project'
        />
        <figcaption>scan of first page</figcaption>
      </figure>
      <br />
      <figure>
        <img
          srcSet={sketchTwo400 + ' 400w, ' + sketchTwo640 + ' 640w '}
          sizes='(max-width: 768px) 100vw,
                        800px'
          src={sketchTwo640}
          alt='pencil sketches of layouts and ideas for this project'
        />
        <figcaption>scan of second page</figcaption>
      </figure>
      <br />
    </div>
  );
}

export default DevelopmentNotes;
