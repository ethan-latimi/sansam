import React from "react";
import { connect } from "react-redux";
import { Radio, Switch, Button } from "antd";
import {
  toggleCollapsedNav,
  onNavTypeChange,
  onNavStyleChange,
  onTopNavColorChange,
  onHeaderNavColorChange,
  onSwitchTheme,
  onDirectionChange,
} from "redux/actions/Theme";
import { LogoutOutlined } from "@ant-design/icons";
import ColorPicker from "components/shared-components/ColorPicker";
import NavLanguage from "./NavLanguage";
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, NAV_TYPE_TOP, SIDE_NAV_DARK, DIR_RTL, DIR_LTR } from "constants/ThemeConstant";
import { useThemeSwitcher } from "react-css-theme-switcher";
import utils from "utils/index";
import { showLoading, signOut } from "redux/actions/Auth";

const colorOptions = ["#3e82f7", "#24a772", "#de4436", "#924aca", "#193550"];

const ListOption = ({ name, selector, disabled, vertical }) => (
  <div className={`my-4 ${vertical ? "" : "d-flex align-items-center justify-content-between"}`}>
    <div className={`${disabled ? "opacity-0-3" : ""} ${vertical ? "mb-3" : ""}`}>{name}</div>
    <div>{selector}</div>
  </div>
);

export const ThemeConfigurator = ({
  navType,
  sideNavTheme,
  navCollapsed,
  topNavColor,
  headerNavColor,
  currentTheme,
  toggleCollapsedNav,
  onNavTypeChange,
  onNavStyleChange,
  onTopNavColorChange,
  onHeaderNavColorChange,
  onSwitchTheme,
  signOut,
}) => {
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  const isCollapse = navCollapsed;

  const { switcher, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    onHeaderNavColorChange("");
    const changedTheme = isChecked ? "dark" : "light";
    onSwitchTheme(changedTheme);
    switcher({ theme: themes[changedTheme] });
  };

  const ontopNavColorClick = (value) => {
    onHeaderNavColorChange("");
    const { rgb } = value;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const hex = utils.rgbaToHex(rgba);
    onTopNavColorChange(hex);
  };
  const onHeaderNavColorClick = (value) => {
    const { rgb } = value;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const hex = utils.rgbaToHex(rgba);
    onHeaderNavColorChange(hex);
  };

  const onNavTypeClick = (value) => {
    onHeaderNavColorChange("");
    if (value === NAV_TYPE_TOP) {
      onTopNavColorChange(colorOptions[0]);
      toggleCollapsedNav(false);
    }
    onNavTypeChange(value);
  };

  const logOut = () => {
    showLoading();
    signOut();
  };

  return (
    <>
      <div className="mb-5">
        <h4 className="mb-3 font-weight-bold">환경 설정</h4>
        {isNavTop ? (
          <ListOption
            name="위 메뉴 (색) :"
            vertical
            selector={<ColorPicker color={topNavColor} colorChange={ontopNavColorClick} />}
          />
        ) : (
          <ListOption
            name="사이드 메뉴 (색) :"
            vertical
            selector={<ColorPicker color={headerNavColor} colorChange={onHeaderNavColorClick} />}
          />
        )}

        <ListOption
          name="메뉴 설정:"
          selector={
            <Radio.Group size="small" onChange={(e) => onNavTypeClick(e.target.value)} value={navType}>
              <Radio.Button value={NAV_TYPE_SIDE}>사이드</Radio.Button>
              <Radio.Button value={NAV_TYPE_TOP}>탑</Radio.Button>
            </Radio.Group>
          }
        />
        <ListOption
          name="메뉴 색상:"
          selector={
            <Radio.Group
              disabled={isNavTop}
              size="small"
              onChange={(e) => onNavStyleChange(e.target.value)}
              value={sideNavTheme}
            >
              <Radio.Button value={SIDE_NAV_LIGHT}>라이트</Radio.Button>
              <Radio.Button value={SIDE_NAV_DARK}>다크</Radio.Button>
            </Radio.Group>
          }
          disabled={isNavTop}
        />
        <ListOption
          name="메뉴 최소화:"
          selector={
            <Switch disabled={isNavTop} checked={isCollapse} onChange={() => toggleCollapsedNav(!navCollapsed)} />
          }
          disabled={isNavTop}
        />
        <ListOption name="다크 모드:" selector={<Switch checked={currentTheme === "dark"} onChange={toggleTheme} />} />
      </div>
      <div className="mb-5">
        <h4 className="mb-3 font-weight-bold">로컬</h4>
        <ListOption name="언어 :" selector={<NavLanguage configDisplay />} />
      </div>
      <div>
        <Button type="danger" icon={<LogoutOutlined />} onClick={logOut} block>
          <span>로그 아웃</span>
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navType, sideNavTheme, navCollapsed, topNavColor, headerNavColor, locale, currentTheme, direction } = theme;
  return { navType, sideNavTheme, navCollapsed, topNavColor, headerNavColor, locale, currentTheme, direction };
};

const mapDispatchToProps = {
  toggleCollapsedNav,
  onNavTypeChange,
  onNavStyleChange,
  onTopNavColorChange,
  onHeaderNavColorChange,
  onSwitchTheme,
  onDirectionChange,
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeConfigurator);
