import React,{useEffect,useState} from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const FLEX4: ViewStyle = {
  flex:4
}
const FLEX1: ViewStyle = {
  flex:1
}
const FLEX8: ViewStyle = {
  flex:8
}
const WRAPPER: ViewStyle = {
marginHorizontal: 20,
marginVertical: 10,
borderWidth:1,
borderColor: color.palette.lightGrey,
paddingVertical: 10,
 paddingHorizontal:10,
 borderRadius:4
} 
const FLEXROW: ViewStyle = {
  flexDirection:'row'
}

export const PostScreen = observer(function PostScreen() {
  const { postStore } = useStores()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [isFetching, setIsFetching] = useState(false)

  useEffect(()=>{
    const interval = setInterval(() => {
      onEndReached()
    }, 10000);
    return () => {
      clearInterval(interval);
    }
  },[isFocused])

  useEffect(() =>{
    callApi()
  },[])


  const callApi = async () =>{
    setIsFetching(true)
    let status = await postStore.getPost()
    if(status){
      setIsFetching(false)
    } else {
      setIsFetching(false)
    }
  }
  const onEndReached = async () =>{
    setIsFetching(true)
    let status = await postStore.getPostOnReachEnd()
    if(status){
      setIsFetching(false)
    } else {
      setIsFetching(false)
    }
  }

  const renderRow = (label, value, item) => {
    return (
      <TouchableOpacity style={FLEXROW} onPress={() => navigation.navigate("postListJSON", {
        post: item
      })}>
  <Text text={label} preset='bold' style={FLEX4} />
  <Text text=':' preset='bold' style={FLEX1} />
  <Text text={value} preset='bold' style={FLEX8} />
  </TouchableOpacity>
    )
  }
  const renderItem = ({item}) => {
return(
<View style={WRAPPER}>
  {renderRow('Title', item.title, item)}
  {renderRow('URL', item.url,item)}
  {renderRow('Author', item.author,item)}
  {renderRow('Created_At', item.created_at,item)}
</View>
)
  } 
  return (
    <Screen style={ROOT} preset='fixed'>
      {isFetching && <ActivityIndicator size={'large'} />}
       <FlatList
        data={postStore.postList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </Screen>
  )
})
