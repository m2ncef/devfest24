const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs/promises');
const genAI = new GoogleGenerativeAI('AIzaSyAv1l7-z2-KoQnJQ9HC-n1r6KW8jfOTASs');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

async function fileToGenerativePart(path, mimeType) {
  const data = await fs.readFile(path);
  return {
    inlineData: {
      data: Buffer.from(data).toString('base64'),
      mimeType,
    },
  };
}

async function generateImageContent(imagePath) {
  try {
    const techData = {
      success: true,
      data: {
        search_metadata: {
          id: '675c654f7f8cfa83f6b8e1be',
          status: 'Success',
          json_endpoint:
            'https://serpapi.com/searches/ccc747faf4348416/675c654f7f8cfa83f6b8e1be.json',
          created_at: '2024-12-13 16:48:15 UTC',
          processed_at: '2024-12-13 16:48:15 UTC',
          google_url:
            'https://www.google.com/search?q=Technology&oq=Technology&sourceid=chrome&ie=UTF-8',
          raw_html_file:
            'https://serpapi.com/searches/ccc747faf4348416/675c654f7f8cfa83f6b8e1be.html',
          total_time_taken: 0.93,
        },
        search_parameters: {
          engine: 'google',
          q: 'Technology',
          google_domain: 'google.com',
          device: 'desktop',
        },
        search_information: {
          query_displayed: 'Technology',
          total_results: 7730000000,
          time_taken_displayed: 0.36,
          organic_results_state: 'Results for exact spelling',
        },
        knowledge_graph: {
          title: 'Technology',
          entity_type: 'kp3_verticals',
          kgmid: '/m/07c1v',
          knowledge_graph_search_link:
            'https://www.google.com/search?kgmid=/m/07c1v&hl=en-US&q=Technology',
          serpapi_knowledge_graph_search_link:
            'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&hl=en-US&kgmid=%2Fm%2F07c1v&q=Technology',
          header_images: [
            {
              image:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/fae2041c8e69cbd0207a4aec84d2bbf11c4bfd9dcb8db6d2cdd088b2076daa0ec530df827fe8917e.webp',
            },
            {
              image:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/fae2041c8e69cbd0207a4aec84d2bbf11c4bfd9dcb8db6d2ad8c83928be43aa9b02eec9599dd9a72.webp',
            },
            {
              image:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/fae2041c8e69cbd0207a4aec84d2bbf11c4bfd9dcb8db6d21d6ad339d93328a99f0c3608ef0f90a7.webp',
            },
          ],
          web_results: [
            {
              link: 'https://en.wikipedia.org/wiki/Technology',
            },
          ],
        },
        related_questions: [
          {
            question: 'What is the simple definition of technology?',
            snippet:
              'What is technology? Technology is the application of scientific knowledge to the practical aims of human life or, as it is sometimes phrased, to the change and manipulation of the human environment.',
            title: 'Technology | Definition, Examples, Types, & Facts | Britannica',
            link: 'https://www.britannica.com/technology/technology#:~:text=What%20is%20technology%3F,manipulation%20of%20the%20human%20environment.',
            displayed_link: 'https://www.britannica.com › Technology › Computers',
            thumbnail:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-oExfG3ukifAnMlMYlnI0EzWcCGJmBa9P68_O6dqwg&s',
            source_logo:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/120581e6aecbc541864b7692febfd8fb801afa79d816e1e344b78a7810930756.png',
            next_page_token:
              'eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTa2M1U210Tk9YVlJOVEZhY1RoVVFVcEVaVkV3YlU5dWFIaFJTM05HZFhnMFkxWjFZVzFRWnpCSlZVSkxRekZIT0RZMlgwUkxiSGt0YW5veE9YTlFSSEJFYVVVelNXOHdhMGc1UmxoSFZrcEpUbEJMUWpZMVlVVXdia3hDZVhaWFFSSVhWVWRXWTFvNExYbEdXbE5zTlU1dlVIUlBTMEl0UVZVYUlrRkdXSEpGWTNCS1lUZE1WbWx6Y0VOVmIxOVBhekJYVTJRMFRYUk5hRkZTVkhjIiwiZmN2IjoiMyIsImVpIjoiVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVUiLCJxYyI6IkNncDBaV05vYm05c2IyZDVFQUI5NkM0eVB3IiwicXVlc3Rpb24iOiJXaGF0IGlzIHRoZSBzaW1wbGUgZGVmaW5pdGlvbiBvZiB0ZWNobm9sb2d5PyIsImxrIjoiR2lSM2FHRjBJR2x6SUhSbFkyaHViMnh2WjNrZ2MybHRjR3hsSUdSbFptbHVhWFJwYjI0IiwiYnMiOiJjLU9LNU5JSnowZ3NVY2dzVmlqSlNGVW96c3d0eUVsVlNFbE55OHpMTE1uTXoxUElUMU1vU1UzT3lNdlB5VS12dEpmWUZtS2tKcVZTRHRNQ2w4SFV5ZVhEcFJTZWtabWNBVktZbUtlUVdwRUlWb0ZtNENWWEkyVXB4WEpDQ3JsY3VPU1FIVnFTWDZCZ2FJQmkwa2NUSTNrcDJYSjhpcmpDdU5TUlRjbE56TXhUS0NndEtzZ3Z4bkRZQm1VakRTbTFjcUpVQ3pBQ0FBIiwiaWQiOiJmY19VR1ZjWjgteUZaU2w1Tm9QdE9LQi1BVV8yIn0=',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTa2M1U210Tk9YVlJOVEZhY1RoVVFVcEVaVkV3YlU5dWFIaFJTM05HZFhnMFkxWjFZVzFRWnpCSlZVSkxRekZIT0RZMlgwUkxiSGt0YW5veE9YTlFSSEJFYVVVelNXOHdhMGc1UmxoSFZrcEpUbEJMUWpZMVlVVXdia3hDZVhaWFFSSVhWVWRXWTFvNExYbEdXbE5zTlU1dlVIUlBTMEl0UVZVYUlrRkdXSEpGWTNCS1lUZE1WbWx6Y0VOVmIxOVBhekJYVTJRMFRYUk5hRkZTVkhjIiwiZmN2IjoiMyIsImVpIjoiVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVUiLCJxYyI6IkNncDBaV05vYm05c2IyZDVFQUI5NkM0eVB3IiwicXVlc3Rpb24iOiJXaGF0IGlzIHRoZSBzaW1wbGUgZGVmaW5pdGlvbiBvZiB0ZWNobm9sb2d5PyIsImxrIjoiR2lSM2FHRjBJR2x6SUhSbFkyaHViMnh2WjNrZ2MybHRjR3hsSUdSbFptbHVhWFJwYjI0IiwiYnMiOiJjLU9LNU5JSnowZ3NVY2dzVmlqSlNGVW96c3d0eUVsVlNFbE55OHpMTE1uTXoxUElUMU1vU1UzT3lNdlB5VS12dEpmWUZtS2tKcVZTRHRNQ2w4SFV5ZVhEcFJTZWtabWNBVktZbUtlUVdwRUlWb0ZtNENWWEkyVXB4WEpDQ3JsY3VPU1FIVnFTWDZCZ2FJQmkwa2NUSTNrcDJYSjhpcmpDdU5TUlRjbE56TXhUS0NndEtzZ3Z4bkRZQm1VakRTbTFjcUpVQ3pBQ0FBIiwiaWQiOiJmY19VR1ZjWjgteUZaU2w1Tm9QdE9LQi1BVV8yIn0%3D',
          },
          {
            question: 'Which is an example of technology?',
            snippet:
              "Whether it's practical (like washing machines, tumble dryers, refrigerators, cars, flooring materials, windows, or door handles) or for leisure (like televisions, Blu-ray players, games consoles, reclining chairs, or toys), all these things are examples of technology.",
            title: 'Everyday Technology | Overview, History & Examples - Lesson',
            link: "https://study.com/academy/lesson/examples-of-technology-in-our-everyday-world.html#:~:text=Whether%20it's%20practical%20(like%20washing,things%20are%20examples%20of%20technology.",
            displayed_link: 'https://study.com › academy › examples-of-technology-i...',
            thumbnail:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcf2h2DXfToBTrAKlRubIzfWnNSfmxS4NymDCGQ1e8mw&s',
            source_logo:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/120581e6aecbc541864b7692febfd8fbb7e848d8c490bec97dd54e8bffdac5af.png',
            next_page_token:
              'eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTa2M1U210Tk9YVlJOVEZhY1RoVVFVcEVaVkV3YlU5dWFIaFJTM05HZFhnMFkxWjFZVzFRWnpCSlZVSkxRekZIT0RZMlgwUkxiSGt0YW5veE9YTlFSSEJFYVVVelNXOHdhMGc1UmxoSFZrcEpUbEJMUWpZMVlVVXdia3hDZVhaWFFSSVhWVWRXWTFvNExYbEdXbE5zTlU1dlVIUlBTMEl0UVZVYUlrRkdXSEpGWTNCS1lUZE1WbWx6Y0VOVmIxOVBhekJYVTJRMFRYUk5hRkZTVkhjIiwiZmN2IjoiMyIsImVpIjoiVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVUiLCJxYyI6IkNncDBaV05vYm05c2IyZDVFQUI5NkM0eVB3IiwicXVlc3Rpb24iOiJXaGljaCBpcyBhbiBleGFtcGxlIG9mIHRlY2hub2xvZ3k/IiwibGsiOiJHaUYzYUdsamFDQnBjeUJoYmlCbGVHRnRjR3hsSUc5bUlIUmxZMmh1YjJ4dlozayIsImJzIjoiYy1PSzVOSUp6MGdzVWNnc1ZpakpTRlVvenN3dHlFbFZTRWxOeTh6TExNbk16MVBJVDFNb1NVM095TXZQeVUtdnRKZllGbUtrSnFWU0R0TUNsOEhVeWVYRHBSU2VrWm1jQVZLWW1LZVFXcEVJVm9GbTRDVlhJMlVweFhKQ0NybGN1T1NRSFZxU1g2QmdhSUJpMGtjVEkza3AyWEo4aXJqQ3VOU1JUY2xOek14VEtDZ3RLc2d2eG5EWUJtVWpEU20xY3FKVUN6QUNBQSIsImlkIjoiZmNfVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVVfMiJ9',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTa2M1U210Tk9YVlJOVEZhY1RoVVFVcEVaVkV3YlU5dWFIaFJTM05HZFhnMFkxWjFZVzFRWnpCSlZVSkxRekZIT0RZMlgwUkxiSGt0YW5veE9YTlFSSEJFYVVVelNXOHdhMGc1UmxoSFZrcEpUbEJMUWpZMVlVVXdia3hDZVhaWFFSSVhWVWRXWTFvNExYbEdXbE5zTlU1dlVIUlBTMEl0UVZVYUlrRkdXSEpGWTNCS1lUZE1WbWx6Y0VOVmIxOVBhekJYVTJRMFRYUk5hRkZTVkhjIiwiZmN2IjoiMyIsImVpIjoiVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVUiLCJxYyI6IkNncDBaV05vYm05c2IyZDVFQUI5NkM0eVB3IiwicXVlc3Rpb24iOiJXaGljaCBpcyBhbiBleGFtcGxlIG9mIHRlY2hub2xvZ3k%2FIiwibGsiOiJHaUYzYUdsamFDQnBjeUJoYmlCbGVHRnRjR3hsSUc5bUlIUmxZMmh1YjJ4dlozayIsImJzIjoiYy1PSzVOSUp6MGdzVWNnc1ZpakpTRlVvenN3dHlFbFZTRWxOeTh6TExNbk16MVBJVDFNb1NVM095TXZQeVUtdnRKZllGbUtrSnFWU0R0TUNsOEhVeWVYRHBSU2VrWm1jQVZLWW1LZVFXcEVJVm9GbTRDVlhJMlVweFhKQ0NybGN1T1NRSFZxU1g2QmdhSUJpMGtjVEkza3AyWEo4aXJqQ3VOU1JUY2xOek14VEtDZ3RLc2d2eG5EWUJtVWpEU20xY3FKVUN6QUNBQSIsImlkIjoiZmNfVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVVfMiJ9',
          },
          {
            question: 'What is the top 10 technology?',
            snippet: null,
            title: 'Top 10: Technology Innovations',
            date: 'Sep 18, 2024',
            link: 'https://technologymagazine.com/top10/top-10-technology-innovations',
            list: [
              'Quantum computing.',
              '5G and advanced connectivity. ... ',
              'Extended Reality (VR/AR) ... ',
              'Internet of Things (IoT) and hyperconnection. ... ',
              'Blockchain and decentralised technologies. ... ',
              'Green and sustainable technologies. ... ',
              'Biotechnology and personalised medicine. ... ',
              'Robotics and automation. ... ',
            ],
            displayed_link: 'https://technologymagazine.com › top10 › top-10-techn...',
            thumbnail:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxwwnyoI_6mKMwf9nsUtyvX6V7cSW25-6H9Dco9Hx6Q&s',
            source_logo:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/120581e6aecbc541864b7692febfd8fbd0dab90ec4a4ed4370b63908c4460658.png',
            next_page_token:
              'eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTa2M1U210Tk9YVlJOVEZhY1RoVVFVcEVaVkV3YlU5dWFIaFJTM05HZFhnMFkxWjFZVzFRWnpCSlZVSkxRekZIT0RZMlgwUkxiSGt0YW5veE9YTlFSSEJFYVVVelNXOHdhMGc1UmxoSFZrcEpUbEJMUWpZMVlVVXdia3hDZVhaWFFSSVhWVWRXWTFvNExYbEdXbE5zTlU1dlVIUlBTMEl0UVZVYUlrRkdXSEpGWTNCS1lUZE1WbWx6Y0VOVmIxOVBhekJYVTJRMFRYUk5hRkZTVkhjIiwiZmN2IjoiMyIsImVpIjoiVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVUiLCJxYyI6IkNncDBaV05vYm05c2IyZDVFQUI5NkM0eVB3IiwicXVlc3Rpb24iOiJXaGF0IGlzIHRoZSB0b3AgMTAgdGVjaG5vbG9neT8iLCJsayI6IkdoMTNhR0YwSUdseklIUm9aU0IwYjNBZ01UQWdkR1ZqYUc1dmJHOW5lUSIsImJzIjoiYy1PSzVOSUp6MGdzVWNnc1ZpakpTRlVvenN3dHlFbFZTRWxOeTh6TExNbk16MVBJVDFNb1NVM095TXZQeVUtdnRKZllGbUtrSnFWU0R0TUNsOEhVeWVYRHBSU2VrWm1jQVZLWW1LZVFXcEVJVm9GbTRDVlhJMlVweFhKQ0NybGN1T1NRSFZxU1g2QmdhSUJpMGtjVEkza3AyWEo4aXJqQ3VOU1JUY2xOek14VEtDZ3RLc2d2eG5EWUJtVWpEU20xY3FKVUN6QUNBQSIsImlkIjoiZmNfVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVVfMiJ9',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTa2M1U210Tk9YVlJOVEZhY1RoVVFVcEVaVkV3YlU5dWFIaFJTM05HZFhnMFkxWjFZVzFRWnpCSlZVSkxRekZIT0RZMlgwUkxiSGt0YW5veE9YTlFSSEJFYVVVelNXOHdhMGc1UmxoSFZrcEpUbEJMUWpZMVlVVXdia3hDZVhaWFFSSVhWVWRXWTFvNExYbEdXbE5zTlU1dlVIUlBTMEl0UVZVYUlrRkdXSEpGWTNCS1lUZE1WbWx6Y0VOVmIxOVBhekJYVTJRMFRYUk5hRkZTVkhjIiwiZmN2IjoiMyIsImVpIjoiVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVUiLCJxYyI6IkNncDBaV05vYm05c2IyZDVFQUI5NkM0eVB3IiwicXVlc3Rpb24iOiJXaGF0IGlzIHRoZSB0b3AgMTAgdGVjaG5vbG9neT8iLCJsayI6IkdoMTNhR0YwSUdseklIUm9aU0IwYjNBZ01UQWdkR1ZqYUc1dmJHOW5lUSIsImJzIjoiYy1PSzVOSUp6MGdzVWNnc1ZpakpTRlVvenN3dHlFbFZTRWxOeTh6TExNbk16MVBJVDFNb1NVM095TXZQeVUtdnRKZllGbUtrSnFWU0R0TUNsOEhVeWVYRHBSU2VrWm1jQVZLWW1LZVFXcEVJVm9GbTRDVlhJMlVweFhKQ0NybGN1T1NRSFZxU1g2QmdhSUJpMGtjVEkza3AyWEo4aXJqQ3VOU1JUY2xOek14VEtDZ3RLc2d2eG5EWUJtVWpEU20xY3FKVUN6QUNBQSIsImlkIjoiZmNfVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVVfMiJ9',
          },
          {
            question: 'What is the main purpose of technology?',
            snippet:
              'The purpose of technology is to solve a human problem or meet a human need or desire. Technology can help provide human food, shelter, communication, entertainment, and much more. Technology is man-made.',
            title: 'Technology | History, Definition & Purpose - Study.com',
            link: 'https://study.com/learn/lesson/invention-technology-purpose-history.html#:~:text=The%20purpose%20of%20technology%20is%20to%20solve%20a%20human%20problem,Technology%20is%20man%2Dmade.',
            displayed_link: 'https://study.com › learn › lesson › invention-technology...',
            source_logo:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/120581e6aecbc541864b7692febfd8fb95e283087e716dfc4bf686d497a86c6e.png',
            next_page_token:
              'eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTa2M1U210Tk9YVlJOVEZhY1RoVVFVcEVaVkV3YlU5dWFIaFJTM05HZFhnMFkxWjFZVzFRWnpCSlZVSkxRekZIT0RZMlgwUkxiSGt0YW5veE9YTlFSSEJFYVVVelNXOHdhMGc1UmxoSFZrcEpUbEJMUWpZMVlVVXdia3hDZVhaWFFSSVhWVWRXWTFvNExYbEdXbE5zTlU1dlVIUlBTMEl0UVZVYUlrRkdXSEpGWTNCS1lUZE1WbWx6Y0VOVmIxOVBhekJYVTJRMFRYUk5hRkZTVkhjIiwiZmN2IjoiMyIsImVpIjoiVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVUiLCJxYyI6IkNncDBaV05vYm05c2IyZDVFQUI5NkM0eVB3IiwicXVlc3Rpb24iOiJXaGF0IGlzIHRoZSBtYWluIHB1cnBvc2Ugb2YgdGVjaG5vbG9neT8iLCJsayI6IkdpWjNhR0YwSUdseklIUm9aU0J0WVdsdUlIQjFjbkJ2YzJVZ2IyWWdkR1ZqYUc1dmJHOW5lUSIsImJzIjoiYy1PSzVOSUp6MGdzVWNnc1ZpakpTRlVvenN3dHlFbFZTRWxOeTh6TExNbk16MVBJVDFNb1NVM095TXZQeVUtdnRKZllGbUtrSnFWU0R0TUNsOEhVeWVYRHBSU2VrWm1jQVZLWW1LZVFXcEVJVm9GbTRDVlhJMlVweFhKQ0NybGN1T1NRSFZxU1g2QmdhSUJpMGtjVEkza3AyWEo4aXJqQ3VOU1JUY2xOek14VEtDZ3RLc2d2eG5EWUJtVWpEU20xY3FKVUN6QUNBQSIsImlkIjoiZmNfVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVVfMiJ9',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTa2M1U210Tk9YVlJOVEZhY1RoVVFVcEVaVkV3YlU5dWFIaFJTM05HZFhnMFkxWjFZVzFRWnpCSlZVSkxRekZIT0RZMlgwUkxiSGt0YW5veE9YTlFSSEJFYVVVelNXOHdhMGc1UmxoSFZrcEpUbEJMUWpZMVlVVXdia3hDZVhaWFFSSVhWVWRXWTFvNExYbEdXbE5zTlU1dlVIUlBTMEl0UVZVYUlrRkdXSEpGWTNCS1lUZE1WbWx6Y0VOVmIxOVBhekJYVTJRMFRYUk5hRkZTVkhjIiwiZmN2IjoiMyIsImVpIjoiVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVUiLCJxYyI6IkNncDBaV05vYm05c2IyZDVFQUI5NkM0eVB3IiwicXVlc3Rpb24iOiJXaGF0IGlzIHRoZSBtYWluIHB1cnBvc2Ugb2YgdGVjaG5vbG9neT8iLCJsayI6IkdpWjNhR0YwSUdseklIUm9aU0J0WVdsdUlIQjFjbkJ2YzJVZ2IyWWdkR1ZqYUc1dmJHOW5lUSIsImJzIjoiYy1PSzVOSUp6MGdzVWNnc1ZpakpTRlVvenN3dHlFbFZTRWxOeTh6TExNbk16MVBJVDFNb1NVM095TXZQeVUtdnRKZllGbUtrSnFWU0R0TUNsOEhVeWVYRHBSU2VrWm1jQVZLWW1LZVFXcEVJVm9GbTRDVlhJMlVweFhKQ0NybGN1T1NRSFZxU1g2QmdhSUJpMGtjVEkza3AyWEo4aXJqQ3VOU1JUY2xOek14VEtDZ3RLc2d2eG5EWUJtVWpEU20xY3FKVUN6QUNBQSIsImlkIjoiZmNfVUdWY1o4LXlGWlNsNU5vUHRPS0ItQVVfMiJ9',
          },
        ],
        ai_overview: {
          page_token:
            'HkNebHicvVTdkqo4EL7cJ1mvjoKKilNlbXUgaHQcBxQ9eEM5gPEHzAyoiHfnXfap9mk2QZ1xdM5u7dbWhipCJ53uL_19zY_fw-Vm_ccv7cV2-5o8SFKapiXKGA2DksciaZZkG0-aszCJvcVv2b5VLXhJSy4Ey5bdHntTtZgZ02FYe2LP20EPFcEu5Eda7sssCVY84mGVSK7EX-tfqzo3Skkp2Lj2sJThIfhvzvEpVEsVuayWBtIs4j7w74Z5bWgYIQB8ttiNK353QwTBECh_TmMiXgQbhLtc1s6zZoFeKSrqFT4EROQ9ZzZSbpjAuKNwz9fSTwmReX32dmigm3r6FVJxrm8D0uF9H50-sAjTh0P_KuAOVOhQlSwO5uQuB9Y0B-rrfQY3FTshMDAehYeE55V8yrmQpZeYT2UpTgQz2qgpM_xWZyO6m0cbt6kBsg_OJq77LFT6CnzLafeSd96Ta973h73hrDR_CnbpsYTK74x3oY6AolOxNej3QKO34D6NNeT4KQH9UkvMy66tR0AMfn_OS8dB5yvO-Zo8BnAgZxxOjIsENmdcw2c6KLyBnEMQeiEch0nzHR1SRM9sUEK4g2kJu8ft7lwgdnSVk0SEQ86LAXgBfc4LsqHNEWaf0Zs8tsjaFkm0XClNgUpPEWDGA-InDpzYZ-FeSqERlN-gAsmFcefscKJysTDvOBUnHHEn7as6CsZhhOALmjtHjJzaRq_Rztgypnursa6_TqjV3DXSM80sevln_e39P1rQsIU-tMD-QgvoXgt5999pQbMo7_6aeqUFJLSQXrTAu787T3mZp0ILw7_Rwkf3f2hBH-rZz7TAu_817_5TKVCaawHr91r4r7o_l0Nwmj7_CnYreqsVA0XpwDMsQJ1Ke67E-6w-2sAga37H_Jcwj7YPrzGj39yl_4Aq3W3mF95ao8BbbFjIaFaIwpi15FkDR3MDNPl5Oe67nXboG6Y_nRSdrpd47eIwUXuHiI0VMIJm1Zc7c3ccjdZGs0knjWM7dl0SVLtkVemWFT3urNKjNYvLmHQC1Q3DyLWM2VrhZer7T00jPQxlvW88TuJi-jipGc_LbNyrW3ZwGPTqRoUMSPHYdXJgSWtVH7TxrltzGCkk3swNkn2rPKsqvq-oqlKWXxrlRiGi2-y11fgTqrMlZA',
          serpapi_link:
            'https://serpapi.com/search.json?engine=google_ai_overview&page_token=HkNebHicvVTdkqo4EL7cJ1mvjoKKilNlbXUgaHQcBxQ9eEM5gPEHzAyoiHfnXfap9mk2QZ1xdM5u7dbWhipCJ53uL_19zY_fw-Vm_ccv7cV2-5o8SFKapiXKGA2DksciaZZkG0-aszCJvcVv2b5VLXhJSy4Ey5bdHntTtZgZ02FYe2LP20EPFcEu5Eda7sssCVY84mGVSK7EX-tfqzo3Skkp2Lj2sJThIfhvzvEpVEsVuayWBtIs4j7w74Z5bWgYIQB8ttiNK353QwTBECh_TmMiXgQbhLtc1s6zZoFeKSrqFT4EROQ9ZzZSbpjAuKNwz9fSTwmReX32dmigm3r6FVJxrm8D0uF9H50-sAjTh0P_KuAOVOhQlSwO5uQuB9Y0B-rrfQY3FTshMDAehYeE55V8yrmQpZeYT2UpTgQz2qgpM_xWZyO6m0cbt6kBsg_OJq77LFT6CnzLafeSd96Ta973h73hrDR_CnbpsYTK74x3oY6AolOxNej3QKO34D6NNeT4KQH9UkvMy66tR0AMfn_OS8dB5yvO-Zo8BnAgZxxOjIsENmdcw2c6KLyBnEMQeiEch0nzHR1SRM9sUEK4g2kJu8ft7lwgdnSVk0SEQ86LAXgBfc4LsqHNEWaf0Zs8tsjaFkm0XClNgUpPEWDGA-InDpzYZ-FeSqERlN-gAsmFcefscKJysTDvOBUnHHEn7as6CsZhhOALmjtHjJzaRq_Rztgypnursa6_TqjV3DXSM80sevln_e39P1rQsIU-tMD-QgvoXgt5999pQbMo7_6aeqUFJLSQXrTAu787T3mZp0ILw7_Rwkf3f2hBH-rZz7TAu_817_5TKVCaawHr91r4r7o_l0Nwmj7_CnYreqsVA0XpwDMsQJ1Ke67E-6w-2sAga37H_Jcwj7YPrzGj39yl_4Aq3W3mF95ao8BbbFjIaFaIwpi15FkDR3MDNPl5Oe67nXboG6Y_nRSdrpd47eIwUXuHiI0VMIJm1Zc7c3ccjdZGs0knjWM7dl0SVLtkVemWFT3urNKjNYvLmHQC1Q3DyLWM2VrhZer7T00jPQxlvW88TuJi-jipGc_LbNyrW3ZwGPTqRoUMSPHYdXJgSWtVH7TxrltzGCkk3swNkn2rPKsqvq-oqlKWXxrlRiGi2-y11fgTqrMlZA',
        },
        answer_box: {
          type: 'dictionary_results',
          syllables: 'tech·nol·o·gy',
          pronunciation_audio:
            'https://ssl.gstatic.com/dictionary/static/sounds/20220808/technology--_us_1.mp3',
          phonetic: '/tekˈnäləjē/',
          word_type: 'noun',
          definitions: [
            'the application of scientific knowledge for practical purposes, especially in industry.',
            'machinery and equipment developed from the application of scientific knowledge.',
            'the branch of knowledge dealing with engineering or applied sciences.',
          ],
          examples: [
            'advances in computer technology',
            "it will reduce the industry's ability to spend money on new technology",
          ],
        },
        organic_results: [
          {
            position: 1,
            title: 'Technology',
            link: 'https://en.wikipedia.org/wiki/Technology',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://en.wikipedia.org/wiki/Technology&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEkQAQ',
            displayed_link: 'https://en.wikipedia.org › wiki › Technology',
            thumbnail:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnL8IlitlV0ngTmHyuSoyqEsjZpSVbe3OIW_dDkk_2IE_vR-NicvDS&usqp=CAE&s',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed1ba75bebb7a576fd24d48e6f11cb6818a.png',
            snippet:
              'Technology is the application of conceptual knowledge to achieve practical goals, especially in a reproducible way. The word technology can also mean the ...',
            snippet_highlighted_words: ['Technology', 'technology'],
            source: 'Wikipedia',
          },
          {
            position: 2,
            title: 'Technology | Definition, Examples, Types, & Facts',
            link: 'https://www.britannica.com/technology/technology',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.britannica.com/technology/technology&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEcQAQ',
            displayed_link: 'https://www.britannica.com › Technology › Computers',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed1244ca889b6932b5d53fab3b1706ccdb3.png',
            date: '7 days ago',
            snippet:
              'Technology is the application of scientific knowledge to the practical aims of human life or, as it is sometimes phrased, to the change and manipulation of the ...',
            snippet_highlighted_words: ['Technology'],
            source: 'Britannica',
          },
          {
            position: 3,
            title: 'Technology Definition & Meaning',
            link: 'https://www.merriam-webster.com/dictionary/technology',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.merriam-webster.com/dictionary/technology&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEsQAQ',
            displayed_link: 'https://www.merriam-webster.com › dictionary › techn...',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed130e832df08b73e0e6439e2ac402a753a.png',
            date: 'Dec 5, 2024',
            snippet:
              'The meaning of TECHNOLOGY is the practical application of knowledge especially in a particular area : engineering. How to use technology in ...',
            snippet_highlighted_words: ['TECHNOLOGY', 'technology'],
            source: 'Merriam-Webster',
          },
          {
            position: 4,
            title: 'MIT Technology Review',
            link: 'https://www.technologyreview.com/',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.technologyreview.com/&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECGUQAQ',
            displayed_link: 'https://www.technologyreview.com',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed16a3be566b58d34b4cff3cddd87e05968.png',
            snippet: 'Emerging technology news & insights | AI, Climate Change, BioTech, and more.',
            snippet_highlighted_words: ['technology'],
            source: 'MIT Technology Review',
          },
          {
            position: 5,
            title: 'BBC Innovation | Technology, Health, Environment, AI',
            link: 'https://www.bbc.com/innovation',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.bbc.com/innovation&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEMQAQ',
            displayed_link: 'https://www.bbc.com › innovation',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed1ca9b48f60ebcc674540e870f673747d5.png',
            snippet:
              'BBC Innovation brings you the latest in Technology news and coverage from around the world, including health, environment, AI, and more.',
            snippet_highlighted_words: ['Technology'],
            sitelinks: {
              inline: [
                {
                  title: 'Tech',
                  link: 'https://www.bbc.com/innovation/technology',
                },
                {
                  title: 'Science & Health',
                  link: 'https://www.bbc.com/innovation/science',
                },
                {
                  title: 'Artificial Intelligence',
                  link: 'https://www.bbc.com/innovation/artificial-intelligence',
                },
                {
                  title: 'AI v the Mind',
                  link: 'https://www.bbc.com/innovation/ai-v-the-mind',
                },
              ],
            },
            source: 'BBC',
          },
          {
            position: 6,
            title: 'Tech | CNN Business',
            link: 'https://www.cnn.com/business/tech',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.cnn.com/business/tech&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEgQAQ',
            displayed_link: 'https://www.cnn.com › business › tech',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed1da7bb85685b609c623900640b189a596.png',
            snippet:
              'View the latest technology headlines, gadget and smartphone trends, and insights from tech industry leaders.',
            snippet_highlighted_words: ['technology'],
            source: 'CNN',
          },
          {
            position: 7,
            title: "Tech News | Today's Latest Technology News",
            link: 'https://www.reuters.com/technology/',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.reuters.com/technology/&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEYQAQ',
            displayed_link: 'https://www.reuters.com › technology',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed194f47d256bc3ed0cf4a0949528a58350.png',
            snippet:
              'Find latest technology news from every corner of the globe at Reuters.com, your online source for breaking international news coverage.',
            snippet_highlighted_words: ['technology'],
            source: 'Reuters',
          },
          {
            position: 8,
            title: 'Georgia Institute of Technology',
            link: 'https://gatech.edu/node/1',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://gatech.edu/node/1&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEQQAQ',
            displayed_link: 'https://gatech.edu › node',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed1d7aeeaa90905ca4a60656344a3707461.png',
            snippet:
              'Explore Georgia Tech, a top public research university developing leaders in technology and improving lives, with diverse programs and global reach.',
            snippet_highlighted_words: ['technology'],
            sitelinks: {
              inline: [
                {
                  title: 'Majors and Degrees',
                  link: 'https://www.gatech.edu/academics/all-degree-programs',
                },
                {
                  title: 'About',
                  link: 'https://www.gatech.edu/about',
                },
                {
                  title: 'Admission Overview',
                  link: 'https://www.gatech.edu/admission',
                },
                {
                  title: 'Colleges and Schools',
                  link: 'https://www.gatech.edu/academics/colleges-and-schools',
                },
              ],
            },
            source: 'Georgia Institute of Technology',
          },
          {
            position: 9,
            title: 'Home - www.caltech.edu',
            link: 'https://www.caltech.edu/',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.caltech.edu/&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEoQAQ',
            displayed_link: 'https://www.caltech.edu',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed1d0f38b401f76857fb776230b756d36f2.png',
            snippet:
              'The California Institute of Technology aims to expand human knowledge and benefit society through research integrated with education.',
            snippet_highlighted_words: ['Technology'],
            sitelinks: {
              inline: [
                {
                  title: 'Contact Us',
                  link: 'https://www.caltech.edu/contact',
                },
                {
                  title: 'Technology Transfer',
                  link: 'https://innovation.caltech.edu/',
                },
                {
                  title: 'Majors & Minors',
                  link: 'https://www.admissions.caltech.edu/why-caltech/academics/majors-minors',
                },
                {
                  title: 'Admissions & Aid',
                  link: 'https://www.caltech.edu/admissions-aid',
                },
              ],
            },
            source: 'Caltech',
          },
          {
            position: 10,
            title: 'Technology',
            link: 'https://www.nytimes.com/section/technology',
            redirect_link:
              'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.nytimes.com/section/technology&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QFnoECEUQAQ',
            displayed_link: 'https://www.nytimes.com › section › technology',
            favicon:
              'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/5b36d965509db30cf062310a93fa7ed165e50ade709934ce811965d36333d990.png',
            snippet:
              'Technology industry news, commentary and analysis, with reporting on big tech, startups, and internet culture.',
            snippet_highlighted_words: ['Technology'],
            sitelinks: {
              inline: [
                {
                  title: 'Personal Technology',
                  link: 'https://www.nytimes.com/section/technology/personaltech',
                },
                {
                  title: 'Opinion',
                  link: 'https://www.nytimes.com/section/opinion/technology',
                },
                {
                  title: 'Technology - Page 2',
                  link: 'https://www.nytimes.com/section/technology?page=2',
                },
                {
                  title: 'Technology - Page 3',
                  link: 'https://www.nytimes.com/section/technology?page=3',
                },
              ],
            },
            source: 'The New York Times',
          },
        ],
        related_searches: [
          {
            block_position: 1,
            query: 'Technology examples',
            link: 'https://www.google.com/search?sca_esv=1a34dd488410b717&q=Technology+examples&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q1QJ6BAhyEAE',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology+examples',
          },
          {
            block_position: 1,
            query: 'Definition of technology for students',
            link: 'https://www.google.com/search?sca_esv=1a34dd488410b717&q=Definition+of+technology+for+students&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q1QJ6BAhvEAE',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Definition+of+technology+for+students',
          },
          {
            block_position: 1,
            query: 'Types of technology',
            link: 'https://www.google.com/search?sca_esv=1a34dd488410b717&q=Types+of+technology&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q1QJ6BAhwEAE',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Types+of+technology',
          },
          {
            block_position: 1,
            query: 'Technology news',
            link: 'https://www.google.com/search?sca_esv=1a34dd488410b717&q=Technology+news&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q1QJ6BAhtEAE',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology+news',
          },
          {
            block_position: 1,
            query: 'Importance of technology',
            link: 'https://www.google.com/search?sca_esv=1a34dd488410b717&q=Importance+of+technology&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q1QJ6BAhrEAE',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Importance+of+technology',
          },
          {
            block_position: 1,
            query: 'How to pronounce technology',
            link: 'https://www.google.com/search?sca_esv=1a34dd488410b717&q=How+to+pronounce+technology&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q1QJ6BAhsEAE',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=How+to+pronounce+technology',
          },
          {
            block_position: 1,
            query: 'Technology essay',
            link: 'https://www.google.com/search?sca_esv=1a34dd488410b717&q=Technology+essay&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q1QJ6BAhqEAE',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology+essay',
          },
          {
            block_position: 1,
            query: 'Technology items',
            link: 'https://www.google.com/search?sca_esv=1a34dd488410b717&q=Technology+items&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q1QJ6BAhxEAE',
            serpapi_link:
              'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology+items',
          },
        ],
        things_to_know: {
          buttons: [
            {
              text: 'Types',
              subtitle: 'Types Of Technology',
              thumbnail:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/3373f84dfecc883ab49cc79891fdb03247ddd315af730547fb85befe8a95d4550bf456ee6bc896c1.png',
              web_links: [
                {
                  title: '20 Types of Technology: Definitions and Examples |',
                  snippet:
                    'Common types of technology · 1. Television. Television sets transmit signals we can listen to and view audio and...',
                  link: 'https://www.indeed.com/career-advice/finding-a-job/types-of-technology',
                  thumbnail:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNS1-lmW_9TfOvNeXbCqolAAecdYj2Uxd-KbtayWcVda7wMQfhzT-cf8YiiI',
                  source: 'Indeed',
                  source_thumbnail:
                    'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/3373f84dfecc883ab49cc79891fdb03247ddd315af730547d02b9cc04a6253440b1a47b3b2fc290dbc42675e07d3d486e157bd2cb405412d.png',
                },
                {
                  title: 'Types of Technology: A Complete Overview [2025]',
                  snippet:
                    'Discover various types of technology, from AI to IoT, and understand their impact on industries and everyday life....',
                  link: 'https://www.simplilearn.com/types-of-technology-article',
                  thumbnail:
                    'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQf3CMvkIq4RRFMhkG6ivGN9YRvxk7LeURaLZaafT7-Z5NoWhyDKRzm8uP4Hng',
                  source: 'Simplilearn.com',
                  source_thumbnail:
                    'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/3373f84dfecc883ab49cc79891fdb03247ddd315af730547d02b9cc04a6253442db09abb06101e18b70868a4de4a00cae40f7e6604911e84.png',
                },
              ],
              search_link:
                'https://www.google.com/search?sca_esv=1a34dd488410b717&q=types+of+technology&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QrooIegQIbhAF',
              serpapi_search_link:
                'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=types+of+technology',
            },
            {
              text: 'Parts',
              subtitle: 'What Are The Four Parts Of Technology?',
              title: 'TECHNOLOGICAL SYSTEMS 8th Grade',
              link: 'https://www.rockwoodschools.org/site/handlers/filedownload.ashx?moduleinstanceid=340&dataid=2879&FileName=Unit-3-Technological-Systems-Interactions-8th-Grade-NEW.pptm#:~:text=Technological%20systems%20include%20input%2C%20processes,and%2C%20at%20times%2C%20feedback.',
              displayed_link: 'https://www.rockwoodschools.org › site › filedownload',
              snippet:
                'Technological systems include input, processes, output, and, at times, feedback.',
              snippet_highlighted_words: ['input, processes, output, and, at times, feedback'],
              favicon:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/3373f84dfecc883ab49cc79891fdb032e29cc994e5641367cd29ff868a966681a182d848ec38b27e.png',
              source: 'rockwoodschools.org',
              search_link:
                'https://www.google.com/search?sca_esv=1a34dd488410b717&q=what+are+the+4+parts+of+technology&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QrooIegQIbhAK',
              serpapi_search_link:
                'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=what+are+the+4+parts+of+technology',
            },
            {
              text: 'Skills',
              subtitle: 'Technology Skills',
              title: 'Technology Skills: What They Are and How to Improve Them - Coursera',
              link: 'https://www.coursera.org/articles/technology-skills#:~:text=Technology%20skills%20are%20all%20the,up%20on%20their%20technological%20knowledge.',
              displayed_link: 'https://www.coursera.org › articles › technology-skills',
              date: 'Nov 21, 2024',
              snippet:
                'Technology skills are all the abilities that help you interact with the digital world around you. Being technologically skilled refers to proficiency in digital or technical media. In this modern age, anyone who wishes to conduct their work efficiently should brush up on their technological knowledge.',
              snippet_highlighted_words: [
                'all the abilities that help you interact with the digital world around you',
              ],
              favicon:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/3373f84dfecc883ab49cc79891fdb032c26f22bf3d65193b30bbfd759466544fbfe5bb772be0dc75.png',
              source: 'coursera.org',
              search_link:
                'https://www.google.com/search?sca_esv=1a34dd488410b717&q=technology+skills&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QrooIegQIbhAP',
              serpapi_search_link:
                'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=technology+skills',
            },
            {
              text: 'Industry',
              subtitle: 'Technology Industry',
              title: 'What is Industrial Tech? - Stimulo',
              link: 'https://stimulo.com/en/what-is-industrial-tech/#:~:text=In%20short%2C%20industrial%20technology%20is,robotics%2C%20advanced%20manufacturing%20and%20digitalization.',
              displayed_link: 'https://stimulo.com › what-is-industrial-tech',
              snippet:
                'In short, industrial technology is a set of technologies and methodologies used in industry to improve efficiency, productivity and quality in the production of goods and services. It includes technologies such as the Internet of Things, automation, robotics, advanced manufacturing and digitalization.',
              favicon:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/3373f84dfecc883ab49cc79891fdb0324c23d2fef8261adab0b0edfbfb0ef868faf93a7fc3a3366f.png',
              source: 'stimulo.com',
              search_link:
                'https://www.google.com/search?sca_esv=1a34dd488410b717&q=technology+industry&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QrooIegQIbhAU',
              serpapi_search_link:
                'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=technology+industry',
            },
            {
              text: 'Benefits',
              subtitle: 'Technology Benefits',
              title: "What are the pros and cons of today's technology? - Becas Santander",
              link: 'https://www.santanderopenacademy.com/en/blog/pros-and-cons-technology.html',
              displayed_link: 'https://www.santanderopenacademy.com › blog › pros-a...',
              date: 'Jan 4, 2023',
              snippet: 'Pros of technology',
              snippet_highlighted_words: ['Pros of technology'],
              list: [
                'Quick access to information. Democratising access to information is undoubtedly one of the greatest advantages of technology. ... ',
                'Facilitated learning. ... ',
                'Breaking the distance barrier. ... ',
                'Simplifying tasks. ... ',
                'Providing entertainment. ... ',
                'Increased productivity and efficiency. ... ',
                'Increased life expectancy. ... ',
                'Creating new jobs.',
              ],
              favicon:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/3373f84dfecc883ab49cc79891fdb03297d3134333ba7b2c67d5ba4f7681685ab08397be501506e9.png',
              source: 'santanderopenacademy.com',
              search_link:
                'https://www.google.com/search?sca_esv=1a34dd488410b717&q=technology+benefits&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QrooIegQIbhAa',
              serpapi_search_link:
                'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=technology+benefits',
            },
            {
              text: 'Companies',
              subtitle: 'Tech Companies',
              title: '41 Technology Companies in India to Know | Built In',
              link: 'https://builtin.com/articles/technology-companies-in-india',
              displayed_link: 'https://builtin.com › articles › technology-companies-in-i...',
              snippet: 'Technology Companies in India to Know',
              snippet_highlighted_words: ['Technology Companies in India to Know'],
              list: [
                'Amazon.',
                'Microsoft.',
                'Tata Consultancy Services.',
                'Salesforce.',
                'PayPal.',
                'IBM.',
                'Zoom.',
                'Flipkart.',
              ],
              favicon:
                'https://serpapi.com/searches/675c654f7f8cfa83f6b8e1be/images/3373f84dfecc883ab49cc79891fdb03242160f5d3559ecec804444c3de66cacef2000ff9cdcdc69c.png',
              source: 'builtin.com',
              search_link:
                'https://www.google.com/search?sca_esv=1a34dd488410b717&q=tech+companies&sa=X&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8QrooIegQIbhAf',
              serpapi_search_link:
                'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=tech+companies',
            },
          ],
        },
        pagination: {
          current: 1,
          next: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=10&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8NMDegQIChAW',
          other_pages: {
            2: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=10&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAE',
            3: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=20&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAG',
            4: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=30&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAI',
            5: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=40&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAK',
            6: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=50&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAM',
            7: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=60&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAO',
            8: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=70&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAQ',
            9: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=80&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAS',
            10: 'https://www.google.com/search?q=Technology&sca_esv=1a34dd488410b717&ei=UGVcZ8-yFZSl5NoPtOKB-AU&start=90&sa=N&sstk=ATObxK7KZPaude8uBmAQQ4Dpn1vf3xbe8dQxghD-BzVqLNYT_AwD4hQ-4rzVICrxqJATMfM7TNX9sToTS5d8DHE7bKIVEax1enUt8w&ved=2ahUKEwjPmrXHmaWKAxWUElkFHTRxAF8Q8tMDegQIChAU',
          },
        },
        serpapi_pagination: {
          current: 1,
          next_link:
            'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=10',
          next: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=10',
          other_pages: {
            2: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=10',
            3: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=20',
            4: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=30',
            5: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=40',
            6: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=50',
            7: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=60',
            8: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=70',
            9: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=80',
            10: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Technology&start=90',
          },
        },
      },
    };
    const trends = techData.data.things_to_know.buttons.map((b) => b.text).join(', ');
    console.log(trends);

    const imagePart = await fileToGenerativePart(imagePath, 'image/jpeg');
    const prompt = `
        Analyze this image and provide the following in JSON format:
        {
            "caption": "A detailed caption describing the image",
            "instagram_post": {
                "title": "An attention-grabbing, creative title for Instagram",
                "description": "An engaging description that would work well on Instagram (2-3 sentences)",
                "hashtags": ["4-5 relevant hashtags, incorporating current tech trends where appropriate"]
            },
            "tech_relevance": "Brief note on how this relates to current technology trends if applicable"
        }

        Current tech trends for context: ${trends}

        Make the content engaging and social-media friendly while maintaining professionalism.
        Ensure hashtags are relevant and trending.`;

    const result = await model.generateContent([imagePart, prompt]);
    const responseText = result.response.text();

    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return {
        error: 'Failed to parse AI response',
        details: responseText,
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      error: error.message,
      details: 'Failed to process image or generate content',
    };
  }
}

module.exports = {
  generateImageContent,
};
