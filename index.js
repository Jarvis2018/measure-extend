/**
 * @Description: measure-extend v1.0.0
 * @author jarvis
*/
(function (SMApp) {
  if (!$) {
    console.warn('measure-extend load error, $ is undefined');
    return
  }
  if (!SMApp) {
    console.warn('measure-extend load error, SMApp is undefined');
    return
  }

  Function.prototype.after = function (fn) {
    const _self = this;
    return function () {
      _self.apply(this, arguments)
      fn.apply(this)
    }
  };

  var _ = function(str){
    return (I18N[lang] && I18N[lang][str])? I18N[lang][str]: str;
  };

  /**
   * 单位配置信息
   * 如需新增配置，可在此添加（如果添加的配置中需要name，直接赋值就行，不需要调用`_`方法）
   */
  var unitsData = [
    {
      units: [
        {
          name: _('Standard'),
          unit: 'px',
          scale: 1
        }
      ]
    },
    {
      name: _('iOS Devices'),
      units: [
        {
          name: _('Points') + ' @1x',
          unit: 'pt',
          scale: 1
        },
        {
          name: _('Retina') + ' @2x',
          unit: 'pt',
          scale: 2
        },
        {
          name: _('Retina HD') + ' @3x',
          unit: 'pt',
          scale: 3
        }
      ]
    },
    {
      name: _('Android Devices'),
      units: [
        {
          name: 'LDPI @0.75x',
          unit: 'dp/sp',
          scale: .75
        },
        {
          name: 'MDPI @1x',
          unit: 'dp/sp',
          scale: 1
        },
        {
          name: 'HDPI @1.5x',
          unit: 'dp/sp',
          scale: 1.5
        },
        {
          name: 'XHDPI @2x',
          unit: 'dp/sp',
          scale: 2
        },
        {
          name: 'XXHDPI @3x',
          unit: 'dp/sp',
          scale: 3
        },
        {
          name: 'XXXHDPI @4x',
          unit: 'dp/sp',
          scale: 4
        }
      ]
    },
    {
      name: _('Web View'),
      units: [
        {
          name: 'CSS Rem 12px',
          unit: 'rem',
          scale: 12
        },
        {
          name: 'CSS Rem 14px',
          unit: 'rem',
          scale: 14
        },
        {
          name: 'CSS Rem 16px',
          unit: 'rem',
          scale: 16
        },
        {
          name: 'css vw 375px',
          unit: 'vw',
          scale: 3.75
        },
        {
          name: 'css rpx @2x',
          unit: 'rpx',
          scale: 0.5
        }
      ]
    }
  ];

  SMApp.fn.unit = function () {
    var self = this,
      unitHtml = [],
      unitList = [],
      unitCurrent = '',
      hasCurrent = '';
    $.each(unitsData, function(index, data){
      if(data.name) unitList.push('<li class="sub-title">' + _(data.name) + '</li>');
      $.each(data.units, function(index, unit){
        var checked = '';
        // if(unit.scale == self.configs.scale){
        if( unit.unit == self.configs.unit && unit.scale == self.configs.scale ){
          checked = ' checked="checked"';
          hasCurrent = _(unit.name);
        }
        unitList.push('<li><label><input type="radio" name="resolution" data-name="' + _(unit.name) + '" data-unit="' + unit.unit + '" data-scale="' + unit.scale + '"' + checked + '><span>' + _(unit.name) + '</span></label></li>');
        // }
      });
    });
    if(!hasCurrent){
      unitCurrent = '<li><label><input type="radio" name="resolution" data-name="' + _('Custom') + ' (' + self.configs.scale + ', ' + self.configs.unit + ')" data-unit="' + self.configs.unit + '" data-scale="' + self.configs.scale + '" checked="checked"><span>' + _('Custom') + ' (' + self.configs.scale + ', ' + self.configs.unit + ')</span></label></li>';
      hasCurrent = _('Custom') + ' (' + self.configs.scale + ', ' + self.configs.unit + ')';
    }
    unitHtml.push(
      '<div class="overlay"></div>',
      '<h3>' + _('Design resolution') + '</h3>',
      '<p>' + hasCurrent + '</p>',
      '<ul>',
      unitCurrent,
      unitList.join(''),
      '</ul>'
    );
    $('#unit').html(unitHtml.join(''));
  };

  SMApp.fn.renderInspector = SMApp.fn.renderInspector.after(function () {
    const codeTemplateEle = $('#css');
    const cssArray = (codeTemplateEle.val()).split(';');
    const adapterLayerDataCssCode = (cssArray) => {
      return cssArray.map(item => {
        if (!item) {
          return item
        }
        const attrName = item.split(':')[0]
        let attrValues = (item.split(':')[1]).split(' ')
        const unit = this.configs.unit.split('/')[0]

        attrValues = attrValues.map(valueItem => {
          const pxIndex = valueItem.indexOf('px')
          const unitIndex = pxIndex === -1 ? valueItem.indexOf(unit) : pxIndex
          if (unitIndex !== -1) {
            const value = valueItem.substring(0, unitIndex)
            const newAttrValue = this.unitSize(value, false)
            return newAttrValue
          }

          return valueItem
        })

        return attrName + ':' + attrValues.join(' ');
      })
    };
    const newLayerDataCssCode = adapterLayerDataCssCode(cssArray);
    codeTemplateEle.val(newLayerDataCssCode);
  });
})(SMApp);
