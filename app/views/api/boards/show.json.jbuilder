# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :title, :user_id, :created_at, :updated_at)

json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.board_id list.board_id
  json.ord list.ord
  json.created_at list.created_at
  json.updated_at list.updated_at
  json.cards list.cards do |card|
    json.id card.id
    json.title card.title
    json.description card.description
    json.ord card.ord
    json.list_id card.list_id
    json.created_at card.created_at
    json.updated_at card.updated_at
  end
end

json.members @board.members do |member|
  json.email member.email
end
