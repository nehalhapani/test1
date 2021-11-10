import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api
api.setup()

export const PostStoreModel = types
  .model("PostStore")
  .props({
    page: types.optional(types.number, 0),
    postList: types.maybeNull(types.frozen()),
    onReachEndPage: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getPost: flow(function* getPost() {
      let response = yield api.getPostData(self.page)
      if(response.kind == 'ok'){
        self.postList = response.data.hits
        return true
      } else {
        self.postList = null
        return false
      }
    }),
    getPostOnReachEnd: flow(function* getPostOnReachEnd() {
      if(!self.onReachEndPage){
        self.page = self.page + 1
        let response = yield api.getPostData(self.page)
        if(response.kind == 'ok'){
          let postDetail = [...self.postList, ...response.data.hits]
          self.postList = postDetail
          self.onReachEndPage = self.page == response.data.nbPages ? true : false
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PostStoreType = Instance<typeof PostStoreModel>
export interface PostStore extends PostStoreType {}
type PostStoreSnapshotType = SnapshotOut<typeof PostStoreModel>
export interface PostStoreSnapshot extends PostStoreSnapshotType {}
export const createPostStoreDefaultModel = () => types.optional(PostStoreModel, {})
