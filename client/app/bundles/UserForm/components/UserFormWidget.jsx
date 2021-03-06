import React, { PropTypes } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

export default class UserFormWidget extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: this.props.user,
      roles: this.props.roles
    };
  }
  handleSubmit(e) {
    console.log(e);
  }

  checkAdmin(e) {
    if(e.target.checked) {
      this.setState({
        user: {
          admin: true
        }
      });
    } else {
      this.setState({
        user: {
          admin: false
        }
      });
    }
  }
  dealRoles(roles) {
    var self = this;
    return roles.map(function(e) {
      var name = "user[roles][" + e.id + "]";
      var checked = self.props.role_ids.indexOf(e.id) != -1;
      return <Checkbox name={name} key={e.id} value={e.id} defaultChecked={checked}>{e.name}</Checkbox>;
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="featureItem">
        <Form name="role" action={this.props.action} method='POST' horizontal onSubmit={this.handleSubmit}>
          <Input name="utf8" type="hidden" value="&#x2713;" />
          <Input name="_method" type="hidden" value={this.props.method} />
          <Input name="authenticity_token" type="hidden" value={this.props.csrf_token} />
          <FormItem
            {...formItemLayout}
            label='邮箱'
            >
            <Input name="user[email]" defaultValue={this.state.user.email} type="text" placeholder="请输入邮箱" />
          </FormItem>
          <FormItem label="管理员" {...formItemLayout}>
            <Checkbox defaultChecked={this.state.user.admin} onChange={this.checkAdmin.bind(this)}></Checkbox>
            <Input type="hidden" name="user[admin]" defaultValue={this.state.user.admin}></Input>
          </FormItem>
          <FormItem label="权限组" {...formItemLayout}>
            {this.dealRoles(this.state.roles)}
          </FormItem>
          <FormItem wrapperCol={{ span: 16, offset: 3}} style={{marginTop: 24}}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
