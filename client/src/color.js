import React, { useEffect, useState } from "react";
 function color(){
    return (
         <div>
            <input ref="textField"></input>
            <select ref="dropDownColor" onChange={this.chageColor}>
                   <option>Color</option>
                   <option value="aqua" style={{color: 'aqua'}}>Blue</option>
                   <option value="red" style={{color: 'red'}}>Red</option>
                   <option value="orange" style={{color: 'orange'}}>Orange</option>
                   <option value="green" style={{color: 'green'}}>Greed</option>
             </select>
             <button onClick={this.addNote}>click</button>
         </div>
    );
}
export default color;
