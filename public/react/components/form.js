//create form component to create an item 

const Form = () => {

    return(
        <div>
        <h1>Add an Item</h1>
        <form>
            <div>
                Name <br/>
                <input />
            </div>
            <div>
                Description <br/>
                <input/>
            </div>
            <div>
                Price <br/>
                <input />
            </div>
            <div>
                Category <br/>
                <input/>
            </div>
            <div>
                Image <br/>
                <input/>
            </div>
            <button>Submit</button>
        </form>
    </div>
    )
}


export default Form; 