import React from 'react';
import newsMatrices from '../../public/news-matrices.json';

var newsMatricesArray = Object.keys(newsMatrices).map((newsMatrix, index) => {
  return {index: parseInt(newsMatrix, 10), newsMatrix: newsMatrices[newsMatrix]};
}).sort((a, b) =>{
  return a.index > b.index;
}).map((newsMatrix) => {
  console.log(newsMatrices[newsMatrix.index]);
  return newsMatrices[newsMatrix.index].replace('//www.thinglink.com/card/', 'https://www.thinglink.com/card/');
});

var NewsMatrices = React.createClass({
  render: function() {
    return (
      <div>
        {
          newsMatricesArray.map((newsMatrix, index) => {
            return (
              <div key={'newsMatrix-' + index} dangerouslySetInnerHTML={{ __html: newsMatrix }}></div>
            );
          })
        }
      </div>
    );
  }
});

module.exports = NewsMatrices;
