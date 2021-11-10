import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
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
    flexDirection:'row',
    marginHorizontal:20,
 borderRadius:4
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

  interface PostJsonRoute {
    route?
  }
export const PostJsonScreen = observer(function PostJsonScreen({route}: PostJsonRoute) {
  const renderRow = (label, value) => {
    return (
      <View style={FLEXROW}>
  <Text text={label} preset='bold' style={FLEX4} />
  <Text text=':' preset='bold' style={FLEX1} />
  <Text text={value} style={FLEX8} />
  </View>
    )
  }
  console.tron.log('route', route.params.post.title)
  return (
    <Screen style={ROOT} preset="scroll">
      <ScrollView>
        <SafeAreaView>
      {route.params.post.title && renderRow('Title', route.params.post.title)}
      {route.params.post.url && renderRow('URL', route.params.post.url)}
      {route.params.post.author && renderRow('Author', route.params.post.author)}
      {route.params.post.created_at && renderRow('created_at', route.params.post.created_at)}
      {route.params.post.points && renderRow('Points', route.params.post.points)}
      {route.params.post.story_text && renderRow('story_text', route.params.post.story_text)}
      {route.params.post.comment_text && renderRow('comment_text', route.params.post.comment_text)}
      {route.params.post.num_comments && renderRow('comment_text', route.params.post.num_comments)}
      {route.params.post.story_id && renderRow('story_id', route.params.post.story_id)}
      {route.params.post.story_title && renderRow('story_title', route.params.post.story_title)}
      {route.params.post.story_url && renderRow('story_url', route.params.post.story_url)}
      {route.params.post.parent_id && renderRow('parent_id', route.params.post.parent_id)}
      {route.params.post.created_at_i && renderRow('created_at_i', route.params.post.created_at_i)}
          </SafeAreaView>
        </ScrollView>
    </Screen>
  )
})
