import React, {Fragment} from "react";
import {Link} from 'react-router-dom';
import Logic from "../logic";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import {HeaderWrap,Header,LogoWrap,Logo,Hamburger,Container,Breadcrumbs,Breadcrumb,FilterWrap,Filter,FilterToggle,User,
    UserMenu,UserWrap,Name,Photo,Icon,Triangle,UserLink,Logout,Tag,Tags,Checkbox,TrashIcon,Clear,Apply, Angle,
    TitleWrap, Section, Range, Title, LogoText, Avatar
} from '../styles'
import Skeleton from "react-loading-skeleton"
import { isAuthorized } from "hocs/checkAuth"
import { FilterIcon } from "assets/core/icon"

export default Logic(({
    state,
    breadcrumbs=[],
    logout,
    toggleFilter, toggleUser, toggleSidebar,
    sidebar, tagsOnChange, clearFilter, applyFilter,
    me, t, filter, rangeOnChange, influencer, theme,
    publicPage
})=>{
    let {filterDropdown, userDropdown, tags, ranges} = state
    return (
        <Header>
            <Container className={!sidebar || !isAuthorized() ? "no-sidebar" : ""}>
                <LogoWrap className={isAuthorized() ? "white" : ""}>
                    {influencer.logo ? <Logo to={undefined} src={influencer.logo} /> : <LogoText to={undefined}>{influencer.appName}</LogoText>}
                    {isAuthorized() && <Hamburger onClick={toggleSidebar} open={sidebar} />}
                </LogoWrap>
                {isAuthorized() && (
                    <HeaderWrap>
                        <Breadcrumbs>
                            {breadcrumbs.map((link, i) =>
                                <Fragment key={i}>
                                    <Breadcrumb to={link.to}>
                                        {link.label}
                                    </Breadcrumb>
                                    {breadcrumbs[i + 1] && (
                                        <Angle className="fas fa-chevron-right" />
                                    )}
                                </Fragment>

                            )}
                        </Breadcrumbs>
                        {filter && filter.tags && filter.tags.length || filter && filter.ranges && filter.ranges.length ? (
                            <FilterWrap>
                                <FilterToggle onClick={toggleFilter} className={filterDropdown ? "open" : ""}>
                                    <FilterIcon size="1.5em" fill={filterDropdown ? theme.$accent : '#FFF'} />
                                </FilterToggle>
                                {filterDropdown && (
                                    <Filter onClick={(e) => { e.nativeEvent.stopImmediatePropagation() }}>
                                        {filter.tags && (
                                            <Section>
                                                <TitleWrap>
                                                    {filter.tags && <Title>{t("categories")}</Title>}
                                                    <Clear onClick={clearFilter}>
                                                        {t("clear_categories")}
                                                        <TrashIcon className="far fa-trash-alt" />
                                                    </Clear>
                                                </TitleWrap>
                                                <Tags>
                                                    {filter.tags.map((tag, i) =>
                                                        <Tag key={i} onClick={() => tagsOnChange(tag._id)}>
                                                            <Checkbox>
                                                                {tags && tags.find(tag_id => tag_id === tag._id) && <i className="fas fa-check" />}
                                                            </Checkbox>
                                                            {tag.name}
                                                        </Tag>
                                                    )}
                                                </Tags>
                                            </Section>
                                        )}
                                        {filter.ranges && filter.ranges.map((range, i) =>
                                            <Section key={i}>
                                                <TitleWrap>
                                                    <Title>{range.title}</Title>
                                                    <Clear onClick={clearFilter}>
                                                        {t("clear_ranges")}
                                                        <TrashIcon className="far fa-trash-alt" />
                                                    </Clear>
                                                </TitleWrap>
                                                <Range>
                                                    <InputRange
                                                        maxValue={range.max || 0}
                                                        minValue={range.min || 0}
                                                        value={ranges && ranges[range.field] ? ranges[range.field] : { min: 0, max: 0 }}
                                                        formatLabel={(value, type) => {
                                                            if (type === "value") {
                                                                return ""
                                                            } else {
                                                                return ranges[range.field] ? ranges[range.field][type] + " " + range.label : value + " " + range.label
                                                            }
                                                        }}
                                                        onChange={(value) => rangeOnChange(range, value)} />
                                                </Range>
                                            </Section>
                                        )}
                                        <Apply onClick={applyFilter}>
                                            {t("apply_filter")}
                                        </Apply>
                                    </Filter>
                                )}
                            </FilterWrap>
                        ) : null}
                        <UserWrap>
                            <User onClick={toggleUser} className={userDropdown ? "open" : ""}>
                                <Name>{me.name}</Name>
                                <Avatar img={me.avatar} name={me.name} />
                                <Icon className={`fas ${userDropdown ? "fa-chevron-up" : "fa-chevron-down"}`} />
                            </User>
                            {userDropdown && (
                                <UserMenu onClick={(e) => { e.nativeEvent.stopImmediatePropagation(); }}>
                                    <Triangle className="user" />
                                    <Link to="/">
                                        <UserLink className="main" >{t("header_home_link")}</UserLink>
                                    </Link>
                                    <Link to="/settings">
                                        <UserLink >{t("header_settings_link")}</UserLink>
                                    </Link>
                                    <a href="http://help.gurucan.com/ru/" target="_blank">
                                        <UserLink>{t("header_help_link")}</UserLink>
                                    </a>
                                    <Logout onClick={logout}>{t("header_logout_link")}</Logout>
                                </UserMenu>
                            )}
                        </UserWrap>
                    </HeaderWrap>
                )}
            </Container>
        </Header>
    )
});
