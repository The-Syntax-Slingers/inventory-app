export function SingleItem({ item }) {
    return (<main>
        <h1>{item.title}</h1>
        <article>
            <h3>{["$ ", item.price].join(" ")}</h3>
            <p>{item.description}</p>
            <img src={item.image} />
        </article>
    </main>);
}

export default SingleItem