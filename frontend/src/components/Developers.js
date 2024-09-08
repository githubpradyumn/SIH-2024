import React from 'react';
import { Developer } from './Developer'

const Developers = () => {
    const developers = [
        {
            name: 'Krishna Ketan Rai',
            description: 'You know who I am.',
            github: 'https://github.com/krikera',
            linkedin: 'https://linkedin.com/in/krishnaketanrai',
            image: 'wallpaperflare.com_wallpaper (10).jpg',
        },
        {
            name: 'Deepak Maurya',
            description: '',
            github: 'https://github.com/deepakmaur',
            linkedin: 'https://linkedin.com/in/deepak-maurya-07ab92251',
            image: 'wallpaperflare.com_wallpaper (11).jpg',
        },
        {
            name: 'Gaurav Bhatt',
            description: '',
            github: 'https://github.com/golubhattuk01',
            linkedin: 'https://linkedin.com/in/golubhattuk01',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQEo8VtKQ6STcg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706735581379?e=1730937600&v=beta&t=7mTs3YIDrfdguTuMXJxsRGMGBRy-Ri4GJizlYWmJcZo',
        },
        {
            name: 'Ankit Bhati',
            description: '',
            github: 'https://github.com/akb2102',
            linkedin:'https://linkedin.com/in/ankit-bhati-6a1799255',
            image: 'https://media.licdn.com/dms/image/v2/D5635AQGE6J3MwWa2KA/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1714199269037?e=1726401600&v=beta&t=ftdzMY33OfadtBXKF46neY64oLlQns1F-kvruT5fJrk',
        },
        {
            name: 'Shreya Singh',
            description: '',
            github: 'https://github.com/shreya23094',
            linkedin: 'https://linkedin.com/in/-shreya--singh',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQH69Q0iKhX9Gg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1707275240870?e=1731542400&v=beta&t=U7bW2RF3ZNGwlLDYulL1SMSio5frJTl76VN-CCLVuWk',
        },
        {
            name: 'Pradyumn Pratap Singh',
            description: '',
            github: 'https://github.com/githubpradyumn',
            linkedin: 'https://linkedin.com/in/pradyumnpratapsingh',
            image: 'wallpaperflare.com_wallpaper (9).jpg',
        },
    ];

    return (
        <div className="container mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((dev, index) => (
                <Developer
                    key={index}
                    name={dev.name}
                    description={dev.description}
                    github={dev.github}
                    linkedin={dev.linkedin}
                    image={dev.image}
                />
            ))}
        </div>
    );
};

export {Developers};
