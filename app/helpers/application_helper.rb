module ApplicationHelper
  def side_menu
    items = [{
      title: '权限组',
      key: 'group_permission',
      icon: 'mail',
      items: [{
        title: '权限表',
        key: 'table_per',
        items: [{
          title: '编辑',
          key: edit_admin_role_path(1),
          can: true
        }, {
          title: '新建',
          key: new_admin_role_path,
          can: true
        }]
      }, {
        title: '呵呵',
        key: admin_roles_path,
        can: true
      }]
    }]
    #items.map { |item| item[:items].reject! { |i| !i[:can] }; item }
  end

end
