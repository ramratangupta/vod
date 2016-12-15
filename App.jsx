import React from 'react';
import AJAX from 'reqwest';
class CarouselItems extends React.Component {
   render() {console.log(this.props)
   		var trimmedString = this.props.title.substr(0, 30);
   		if(trimmedString!=this.props.title)
   			trimmedString= trimmedString+'...';
      return (
        <div className={this.props.index==0 ? "item active" : "item"}>
	      <img src={this.props.images[0].url == "" ? "./images/no-img.png": this.props.images[0].url} alt={this.props.title} />
	      <div className="carousel-caption">
	       	{trimmedString}
	      </div> 
    	</div>
      );
   }
}

class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      data: [],
	    };
	}	
	componentDidMount(){
   		AJAX({
		    url: 'https://demo2697834.mockable.io/movies'
		    , type: 'json'
		    , error: function (err) {
		        //console.log("Error while loading")
		    }
		    , success: function (resp) {
		        this.setState({data: resp.entries});
		    }.bind(this)
		});
	}
	
   	render() {
		return (<div>
				<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
				  			<button type="button" className="navbar-toggle collapsed" 
								data-toggle="collapse" data-target="#navbar" 
								aria-expanded="false" aria-controls="navbar">
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

		    		<div id="myCarouselWrapper" className="container">
					
						<div id="carousel-example-generic" className="carousel slide container" 
							data-ride="carousel" data-interval="false" 
							data-wrap="true" data-keyboard="true">

							  <div className="carousel-inner" role="listbox">
							    	{
							    		this.state.data.map(function(v,i){v.index = i;
							    			return (<CarouselItems key={v.id} {...v}/>)
							    		})
									}
							  </div>


							  <a className="left carousel-control" href="#carousel-example-generic" 
								role="button" data-slide="prev">
							    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
							    <span className="sr-only">Previous</span>
							  </a>
							  <a className="right carousel-control" href="#carousel-example-generic" 
								role="button" data-slide="next">
							    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							    <span className="sr-only">Next</span>
							  </a>
						</div>
		    		</div>
			</div>
	      );
   }
}

export default App;
