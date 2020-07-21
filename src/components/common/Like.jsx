import React from 'react';

const Like = (props) => {
   
    const { liked, onClick } = props
    let  classes = ""
    if ( liked === true) 
        classes = "fa fa-heart"
    else
        classes ="fa fa-heart-o"
    
    
    return (<i className={classes} aria-hidden="true" onClick={onClick}></i>);
}
 
export default Like;