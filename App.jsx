/**
@author Ramratan Gupta
*/
import React from 'react';
import AJAX from 'reqwest';
import _ from 'underscore';
/**
An component to render carousel items using props, a stateless component.
*/
class CarouselItems extends React.Component {
	constructor(props) {
	    super(props);
	    this.updateCurrentPlay = this.updateCurrentPlay.bind(this);
	}
	updateCurrentPlay(){
		//return whole props to parrent to add in playback history.
		this.props.updateCurrentPlay(this.props);
	}
	render() {
   		var trimmedString = this.props.title.substr(0, 20);
   		if(trimmedString!=this.props.title)
   			trimmedString= trimmedString+'...';
		return  (
		<div className="item-item col-md-2 col-sm-4">
			<div className="ImageLink" onClick = {this.updateCurrentPlay}>
		      <img className="ItemImage" src={this.props.images[0].url == "" ? "./images/no-img.png": this.props.images[0].url} alt={this.props.title} />
		      <i className="OverlayIcon fa fa-play fa-3" aria-hidden="true"></i>
		  	</div>
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
	      data: [],//will hold API response from video API 
	      dataHistory: [],//will hold data of played video
	      isHistory: false,//to add active class in top navigation and switch between history and main playlist
	      isVideoPlaying: false,//will control the display of custom play icon on HTML5 video tag
	      preview_enlarge : false,//will control the full screen video on APP
	      currentPlay : {}// will JSON object of current video play and used in callback of CarouselItems component
	    };
	    /*
	    	toggle full screen video
	    */
	    this.toggleVideo = this.toggleVideo.bind(this);
	    
	    /*
	    	set current currentPlay state varibale for current playing video.
	    */
    	this.updateCurrentPlay = this.updateCurrentPlay.bind(this);
	    
	    /*
	    	will call API to persist data on server
	    */
	    this.addToHistory = this.addToHistory.bind(this);
	    
	    /*
	    	add active class on top nav for History, and set video full play back to normal
	    */
	    this.toggleHistory = this.toggleHistory.bind(this);

	    /*
	    	add active class on top nav for Home, and set video full play back to normal
	    */
	    this.toggleHome = this.toggleHome.bind(this);
	    
	    /*
	    	below two functions are used for display of custom icons
	    */
	    this.playVideo = this.playVideo.bind(this);
	    this.displayCustomPlayIcon = this.displayCustomPlayIcon.bind(this);
	}
	toggleHistory(){
		this.setState({isHistory:true,preview_enlarge:false});
	}
	playVideo(e){
		e.target.parentNode.firstElementChild.play();
		this.setState({isVideoPlaying:true});
	}
	displayCustomPlayIcon(){
		this.setState({isVideoPlaying:false});
	}
	toggleHome(){
		this.setState({isHistory:false,preview_enlarge:false});
	}
	toggleVideo(){
		var preview_enlarge = !this.state.preview_enlarge;
		this.setState({preview_enlarge:preview_enlarge});
	}
	updateCurrentPlay(video){
		this.setState({currentPlay:video});
		this.toggleVideo();
	}
	addToHistory(){
		var dataHistory =  this.state.dataHistory;
		var currentPlay = this.state.currentPlay;
		this.setState({isVideoPlaying:true});
		if(! (_.findIndex(dataHistory, { id: currentPlay.id }) != -1)){
			dataHistory = dataHistory.concat(currentPlay);
			this.setState({dataHistory:dataHistory});
			var postData = {video_json:JSON.stringify(currentPlay),video_id:currentPlay.id}
			AJAX({
			    url: '/vod/addVideoToHistory.php'
			    , type: 'json'
			    , crossOrigin: true
  				, withCredentials: true
			    , method: 'post'
			    , data: postData
			    , error: function (err) {
			        //console.log("Error while loading")
			    }
			    , success: function (resp) {
			        //console.log(resp);
			    }.bind(this)
			});
		}
	}
	componentDidMount(){
		AJAX({
		    url: '/vod/listhistory.php'
		    , type: 'json'
		    , crossOrigin: true
  			, withCredentials: true
		    , error: function (err) {
		        //console.log("Error while loading")
		    }
		    , success: function (resp) {
		    	this.setState({dataHistory: resp});
		    }.bind(this)
		});

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

	prepareCarouselData(){
		var prepareData = [];
		var subItems = [];
		var dataCarousel = this.state.isHistory ? this.state.dataHistory : this.state.data;
		var j=1;
		for(var i=0; i<dataCarousel.length; i++){
			subItems.push(<CarouselItems updateCurrentPlay={this.updateCurrentPlay} key={dataCarousel[i]['id']} {...dataCarousel[i]}/>)
			if(j%6 == 0){
				prepareData.push(<div className={prepareData.length ==0 ? "item active":"item" }>{subItems}</div>);
				subItems = [];
			}
			j++;
		}// debugger
		if(subItems.length > 0 || dataCarousel.length <=5){
			prepareData.push(<div className={dataCarousel.length <=5 ? "item active":"item" }>{subItems}</div>);
		}
		return prepareData.reverse();
	}
	
   	render() {
	   	var video_playback = this.state.preview_enlarge ? (
	      			<div className="enlargeOuter">
		            	<div className="col-md-12 col-xs-12 enlarge">
		                	<div className="panel panel-default">
							  <div className="panel-heading">
							  		<span className="preview_text">{this.state.currentPlay.title}
		        					<span className="glyphicon glyphicon-resize-small" aria-hidden="true" onClick={this.toggleVideo} style={{float:"right",cursor:'pointer',marginTop:'5px',fontSize:'14px'}}></span>
		                   			</span>
							  </div>
							  <div className="panel-body">
							  <div style={{"textAlign":"center"}} className="video-outer">
							    		<video onPlay={this.addToHistory} onPause={this.displayCustomPlayIcon} onEnded = {this.toggleVideo} controls preload="auto" 
									    	poster = {this.state.currentPlay.images[0].url == "" ? "./images/no-img.png": this.state.currentPlay.images[0].url} >
									        	<source src={this.state.currentPlay.contents[0].url} type={"video/"+this.state.currentPlay.contents[0].format}
									        	/>
									    </video>
									    {this.state.isVideoPlaying ? null : (<i className="OverlayIconplaypack fa fa-play fa-3" aria-hidden="true" onClick={this.playVideo}></i>) }
								    </div>
								
								<div className="panel-footer">{this.state.currentPlay.description}</div>
								
							  </div>
							</div>
		                </div>
	                </div>
        		): null;
        		
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
							    <li className={this.state.isHistory == false ? "active" : null} onClick={this.toggleHome} ><a href="javascript:void(0);">Home</a></li>
							    <li className={this.state.isHistory == true ? "active" : null} onClick={this.toggleHistory} ><a href="javascript:void(0);">Histroy</a></li>
							  </ul>
						</div>
					</div>
				</nav>
					{video_playback}
		    		<div id="myCarouselWrapper" className="container">
					
						<div id="carousel-example-generic" className="carousel slide container" 
							data-ride="carousel" data-interval="false" 
							data-wrap="true" data-keyboard="true">
							  <div className="carousel-inner" role="complementary">
							    	{ this.prepareCarouselData() }
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
