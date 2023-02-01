import { SelectedItemList } from './Filter'
import { SKILLS_LIST } from '../DefaultData'
import './SkillsList.css'


function SkillsList({label, selectedSkills, onSelect, highlightedSkills}) {
    return (
        <div class="SkillsList">
            <label>{label}
                <select 
                    value={selectedSkills[-1]} 
                    onChange={ev => onSelect(ev)}
                >
                    { SKILLS_LIST.map( skill => (
                        <option value={skill}>{skill}</option>
                    )) }
                </select>
            </label>

            {/* render list selected skills */}
            <SelectedItemList 
                itemList={selectedSkills} 
                selectedItems={highlightedSkills} 
            />
        </div>
    )
}

export default SkillsList