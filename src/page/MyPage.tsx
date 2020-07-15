import React from 'react';
import UserContext from '../context/UserContext'
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../graphql/queries';
import {createPost} from '../graphql/mutations';
import {onCreatePost} from '../graphql/subscriptions';

const MyPage = () => {
  const {user, updateCurrentUser, isLoaded} = React.useContext(UserContext)
  const [posts, setPosts] = React.useState([])
  const [post, setPost] = React.useState({title: '', content: ''})

  const fetchPosts = React.useCallback(async () => {
    const response = await API.graphql(graphqlOperation(listPosts))
    console.log(response)
    // @ts-ignore
    setPosts(response.data.listPosts.items)
  }, [])

  const subscriptionPosts = React.useCallback(() => {
    // @ts-ignore
    API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: (eventData: any) => {
        console.log('eventData: ', eventData)
        const post = eventData.value.data.onCreatePost
        const newPosts = [...posts.filter((content: any) => {
          return (content.title !== post.title)
        }), post]
        // @ts-ignore
        setPosts(newPosts)
      }
    })
  }, [])

  React.useEffect(() => {
    subscriptionPosts()
  }, [subscriptionPosts])

  React.useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  React.useEffect(() => {
    updateCurrentUser()
  }, [])

  const submitPost = async () => {
    if (post.title === '' || post.content === '') {
      return
    }

    const createPostInput = {
      title: post.title,
      content: post.content
    }

    try {
      const newPosts = [...posts, createPostInput]
      // @ts-ignore
      setPosts(newPosts)
      console.log({newPosts})
      setPost({title: '', content: ''})
      await API.graphql(graphqlOperation(createPost, {input: createPostInput}))
      console.log({createPostInput})
    } catch (e) {
      console.error(e)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = e;
    const {value, name} = target;
    switch (name) {
      case 'title':
        setPost({title: value, content: post.content})
        break
      case 'content':
        setPost({title: post.title, content: value})
    }
  }

  const handleSignOut = async () => {
    await Auth.signOut().then(() => {
      alert('ログアウトしました')
    })
  }

  return (
    isLoaded ? (
      <>
        {user.username}
        <div>
          <button onClick={handleSignOut}>sign out</button>
          <div>
            <p>タイトル</p>
            <input type="text" name='title' defaultValue={post.title} onChange={handleOnChange}/>
          </div>
          <div>
            <p>内容</p>
            <input type="text" name='content' defaultValue={post.content} onChange={handleOnChange}/>
          </div>
          <div>
            <button onClick={submitPost}>追加</button>
          </div>
          <section>
            {posts.map((post: any, idx) => {
              return <div key={idx}>
                <div>
                  <p>title: {post.title}</p>
                </div>
                <div>
                  <p>content: {post.content}</p>
                </div>
                <hr/>
              </div>
            })}
          </section>
        </div>
      </>
    ) : (
      <>
        <p>now loading</p>
      </>
    )
  )
}

export default MyPage
