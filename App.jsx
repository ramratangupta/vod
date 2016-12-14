import React from 'react';

class App extends React.Component {
   render() {
      return (<div>
		 <nav className="navbar navbar-inverse navbar-fixed-top">
	      <div className="container">
		<div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          
        </div>
		<div id="navbar" className="collapse navbar-collapse">
		  <ul className="nav navbar-nav">
		    <li className="active"><a href="#">Home</a></li>
		    <li><a href="#histroy">Histroy</a></li>
		  </ul>
		</div>
	      </div>
	    </nav>

	    <div className="container">Hello1
	    </div>
	</div>
      );
   }
}

export default App;
