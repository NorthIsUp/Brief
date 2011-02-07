var old = SCS.conv._nearBottom;
SCS.conv._nearBottom = function(){
  return (document.body.scrollTop+window.innerHeight >= document.body.scrollHeight-75);
};