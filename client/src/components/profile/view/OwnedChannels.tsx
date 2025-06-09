function OwnedChannels(){
    return (
        <form className="flex column">
            <div className="box flex column">
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    name="name"
                    style={{ background: 'black' }}
                    className="box" 
                    placeholder="Channel Name..."
                />
            </div>
            <div className="box flex column">
                <label htmlFor="description">Description</label>
                <textarea name="description" className="box" placeholder="Channel Description"></textarea>
            </div>
            <div className="box flex column">
                <label htmlFor="name">Status</label>
                <select name="status" className="box" style={{ color: 'white', background: 'black' }}>
                    <option value="false" className="box" style={{ color: 'white', background: 'black' }}>Private</option>
                    <option value="true" className="box" style={{ color: 'white', background: 'black' }}>Public</option>
                </select>
            </div>
            <button className="box button" style={{ padding: '15px 0px'}}>Create Channel</button>
        </form>
    );  
}

export default OwnedChannels;