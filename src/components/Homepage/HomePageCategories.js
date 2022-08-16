import React from 'react';
import { Link } from 'react-router-dom';

const HomePageCategories = () => {
    async function fetchCategories (){
        const categoryNames = await getAllCategories();
    }

    

    return (
        <section>
            <Link to='/categories'>
            Categories
            </Link>
        </section>

    )
}

export default HomePageCategories